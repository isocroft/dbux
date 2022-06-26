import last from 'lodash/last';
import findLastIndex from 'lodash/findLastIndex';
import pullAllBy from 'lodash/pullAllBy';
import NanoEvents from 'nanoevents';
import { throttle } from '@dbux/common/src/util/scheduling';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import Enum from '@dbux/common/src/util/Enum';
import DataNodeType, { isDataNodeDelete, isDataNodeModifyOrComputeType, isDataNodeModifyType } from '@dbux/common/src/types/constants/DataNodeType';
import DDGTimelineNodeType, { isControlGroupTimelineNode, isSnapshotTimelineNode } from '@dbux/common/src/types/constants/DDGTimelineNodeType';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import { DDGRootTimelineId, isDDGRoot } from './constants';
import BaseDDG from './BaseDDG';
import { EdgeState } from './DDGEdge';
import DDGSummaryMode, { isExpandedMode, isShallowExpandedMode } from './DDGSummaryMode';
import ddgQueries from './ddgQueries';
import DDGNodeSummary from './DDGNodeSummary';
import { DDGTimelineNode } from './DDGTimelineNodes';
import DDGSettings from './DDGSettings';
import PDGSnapshotConfig from './PDGSnapshotConfig';

/** @typedef {import('@dbux/common/src/types/RefSnapshot').ISnapshotChildren} ISnapshotChildren */
/** @typedef { Map.<number, number> } SnapshotMap */

// const VerboseSumm = 2;
const VerboseSumm = 0;

/** ###########################################################################
 * default config
 * ##########################################################################*/

// const RootDefaultSummaryMode = DDGSummaryMode.ExpandSelf;
const RootDefaultSummaryMode = DDGSummaryMode.HideChildren;

/**
 * What to do with non-expandable modes nodes when expanding a group.
 * → We hide nodes because they will get summarized.
 * (Does not apply to `ExpandSubgraph`.)
 */
const DefaultNonExpandableExpandMode = DDGSummaryMode.Hide;
// const DefaultNonExpandableExpandMode = DDGSummaryMode.Show;

/** ###########################################################################
 * hackfixes
 *  #########################################################################*/

/**
 * hackfix: remove summary data before summarizing again.
 * We add this to deal with the fact that we do not currently correctly cache
 * `nodeSummaries` (and all summary nodes).
 * Need a new `summariesByConfig` caching solution.
 * @param {DataDependencyGraph} ddg
 */
function hackfixCleanupBeforeSummary(ddg) {
  const i = findLastIndex(ddg.og._timelineNodes, n => n.og);
  if (i) {
    ddg.og._timelineNodes = ddg.og._timelineNodes.slice(0, i + 1);
  }
  ddg.nodeSummaries = {};
}


/** ###########################################################################
 * util
 * ##########################################################################*/

const ShallowSummaryConfig = {
  isShallow: true,
  maxGroupDepth: 1
};

const DefaultSummaryConfig = {
  isShallow: false
};

/** ###########################################################################
 * {@link BuildStage}
 * ##########################################################################*/

const buildStageObj = {
  None: 0,
  /**
   * Building initial graph.
   */
  Building: 1,
  /**
   * Building a summarized graph from an already existing initial graph.
   */
  Summarizing: 2
};
const BuildStage = new Enum(buildStageObj);

/** ###########################################################################
 * utilities
 *  #########################################################################*/

class SummaryState {
  /**
   * From → To → summary state.
   * Indexed by `timelineId`.
   * 
   * @type {Map.<number, Map.<number, EdgeState>>}
   */
  visibleEdges = new Map();

  /**
   * This maps all nodes to the visible nodes that replace them.
   * Visible nodes are mapped to themselves.
   * Indexed by `timelineId`.
   * 
   * @type {Map.<number, Array.<DDGTimelineNode>}
   */
  nodeRouteMap = new Map();

  /**
   * Represents the currently collapsed ancestor.
   * All nested edges will be re-routed to it.
   */
  currentCollapsedAncestor = null;

  addEdge(from, to, type) {
    const { visibleEdges } = this;
    let edgeTargets = visibleEdges.get(from.timelineId);
    if (!edgeTargets) {
      visibleEdges.set(from.timelineId, edgeTargets = new Map());
    }
    let edgeState = edgeTargets.get(to.timelineId);
    if (!edgeState) {
      edgeTargets.set(to.timelineId, edgeState = new EdgeState());
    }
    edgeState.nByType[type] = (edgeState.nByType[type] || 0) + 1;
  }
}


/** ###########################################################################
 * {@link DataDependencyGraph}
 *  #########################################################################*/

/**
 * 
 */
export default class DataDependencyGraph extends BaseDDG {
  buildStage = BuildStage.None;

  /**
   * The complete base graph
   * @type {BaseDDG}
   */
  og;

  /**
   * @type {Object.<number, SummaryModeValue>}
   */
  summaryModes = {};

  /**
   * Summary data by `timelineId`.
   * NOTE: This is built lazily in {@link DataDependencyGraph##buildNodeSummary}.
   * 
   * @type {Object.<string, DDGNodeSummary>}
   */
  nodeSummaries = {};

  /**
   * @type {DDGSettings}
   */
  settings = new DDGSettings();

  /** ########################################
   * other
   * #######################################*/

  _emitter = new NanoEvents();

  debugValueId;

  constructor(ddgSet, graphId, applicationId, contextId) {
    super(ddgSet, graphId, applicationId, contextId);
  }

  getRenderData() {
    const {
      // original node data
      og: {
        timelineNodes,
      }
    } = this;

    return {
      timelineNodes,

      ...this.getChangingData()
    };
  }

  /**
   * This data changes over time and is sent back to client
   * on every update.
   */
  getChangingData() {
    const {
      settings,

      // summary data
      summaryModes,
      nodeSummaries,

      // current edge data
      edges,
      outEdgesByTimelineId,
      inEdgesByTimelineId
    } = this;

    return {
      settings,
      summaryModes,
      nodeSummaries,
      edges,
      outEdgesByTimelineId,
      inEdgesByTimelineId
    };
  }

  /** ###########################################################################
   * getters
   * ##########################################################################*/

  get watchSet() {
    return this.og.watchSet;
  }

  get bounds() {
    return this.og.bounds;
  }

  get timelineNodes() {
    return this.og.timelineNodes;
  }

  /**
   * hackfix: remove this once we fixed decisions
   */
  get decisionTimelineNodes() {
    return this.og.decisionNodes;
  }

  get timelineNodesByDataNodeId() {
    return this.og.timelineNodesByDataNodeId;
  }

  get timelineBuilder() {
    return this.og.timelineBuilder;
  }

  get isBuilding() {
    return BuildStage.is.Building(this.buildStage);
  }

  get isSummarizing() {
    return BuildStage.is.Summarizing(this.buildStage);
  }

  /** ###########################################################################
   * public control methods
   *  #########################################################################*/

  /**
   * @param {DDGSettings} settings 
   */
  updateSettings(settings) {
    for (const name in settings) {
      if (!(name in this.settings)) {
        throw new Error(`invalid graph setting: ${name} (${JSON.stringify(settings)})`);
      }
    }
    this.settings = settings;

    // build graph again
    // TODO: not all settings need a re-build
    this.#buildSummarizedGraph();
  }

  /**
   * Convinient little tool
   */
  toggleSummaryMode(timelineId) {
    const { summaryModes } = this;
    const summaryMode = summaryModes[timelineId];
    if (isExpandedMode(summaryMode)) {
      // collapse
      if (!this.setSummaryMode(timelineId, DDGSummaryMode.CollapseSummary)) {
        // NOTE: cannot collapse: ignore for now
        // TODO: there is a chance that this node cannot render anything anyway, because it only has disconnected ancestors etc.
      }
    }
    else {
      // expand
      const summarizableChildren = ddgQueries.getSummarizableChildren(this, timelineId);
      if (!summarizableChildren.length) {
        // nothing to summarize → expand in full instead
        this.setSummaryMode(timelineId, DDGSummaryMode.ExpandSubgraph);
      }
      else {
        if (!this.setSummaryMode(timelineId, DDGSummaryMode.ExpandSelf)) {
          // ExpandSelf did not work → expand all instead
          this.setSummaryMode(timelineId, DDGSummaryMode.ExpandSubgraph);
        }
        if (summarizableChildren.length === 1 &&
          !isExpandedMode(summaryModes[summarizableChildren[0].timelineId])
        ) {
          // open up single nested expandable child as well
          this.toggleSummaryMode(summarizableChildren[0].timelineId);
        }
      }
    }
  }

  setSummaryMode(timelineId, mode) {
    // update node modes
    if (this.#applyMode(timelineId, mode)) {
      // refresh the summarized graph
      this.#buildSummarizedGraph();
      return true;
    }
    else {
      return false;
    }
  }


  /** ###########################################################################
   * summarization propagation
   * ##########################################################################*/

  /**
   * Heuristic: what to do with non-expandable nodes when expanding.
   */
  #getNonExpandableNodeExpandMode(node) {
    if (node.watched) {
      return isControlGroupTimelineNode(node.type) ?
        DDGSummaryMode.HideChildren :
        DDGSummaryMode.Show;
    }
    return DefaultNonExpandableExpandMode;
  }

  #getHideMode(node) {
    if (node.watched) {
      return isControlGroupTimelineNode(node.type) ?
        DDGSummaryMode.HideChildren :
        DDGSummaryMode.Show;
    }
    return DDGSummaryMode.Hide;
  }

  propagateSummaryMode = {
    [DDGSummaryMode.Show]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      if (node.children) {
        // show all children
        for (const childId of Object.values(node.children)) {
          // const childNode = og.timelineNodes[childId];
          this.#applyMode(childId, DDGSummaryMode.Show);
        }
      }
    },
    [DDGSummaryMode.Hide]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      if (node.children) {
        // hide all children
        for (const childId of Object.values(node.children)) {
          // const childNode = og.timelineNodes[childId];
          this.#applyMode(childId, DDGSummaryMode.Hide);
        }
      }
    },
    // NOTE: DDGSummaryMode.ExpandSelf is now the same as CollapseSummary
    [DDGSummaryMode.CollapseSummary]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // hide all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        this.#applyMode(childId, this.#getHideMode(childNode));
      }
    },
    [DDGSummaryMode.ExpandSelf]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // collapse all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        const targetMode = ddgQueries.canNodeExpand(this, childNode) ?
          DDGSummaryMode.CollapseSummary :
          this.#getNonExpandableNodeExpandMode(childNode);
        this.#applyMode(childId, targetMode);
      }
    },
    [DDGSummaryMode.ExpandSelf1]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // collapse all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        const targetMode = ddgQueries.canApplySummaryMode(this, childNode, DDGSummaryMode.ExpandSelf) ?
          DDGSummaryMode.ExpandSelf :
          this.#getNonExpandableNodeExpandMode(childNode);
        this.#applyMode(childId, targetMode);
      }
    },
    [DDGSummaryMode.ExpandSelf2]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // collapse all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        const targetMode = ddgQueries.canApplySummaryMode(this, childNode, DDGSummaryMode.ExpandSelf1) ?
          DDGSummaryMode.ExpandSelf1 :
          this.#getNonExpandableNodeExpandMode(childNode);
        this.#applyMode(childId, targetMode);
      }
    },
    [DDGSummaryMode.ExpandSelf3]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // collapse all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        const targetMode = ddgQueries.canApplySummaryMode(this, childNode, DDGSummaryMode.ExpandSelf2) ?
          DDGSummaryMode.ExpandSelf2 :
          this.#getNonExpandableNodeExpandMode(childNode);
        this.#applyMode(childId, targetMode);
      }
    },
    [DDGSummaryMode.ExpandSelf4]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // collapse all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        const targetMode = ddgQueries.canApplySummaryMode(this, childNode, DDGSummaryMode.ExpandSelf3) ?
          DDGSummaryMode.ExpandSelf3 :
          this.#getNonExpandableNodeExpandMode(childNode);
        this.#applyMode(childId, targetMode);
      }
    },
    [DDGSummaryMode.ExpandSubgraph]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // expand all children and their children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        const targetMode = ddgQueries.canNodeExpand(this, childNode) ?
          DDGSummaryMode.ExpandSubgraph :
          DDGSummaryMode.Show;
        this.#applyMode(childId, targetMode);
      }
    },
    [DDGSummaryMode.HideChildren]: (timelineId) => {
      const { og } = this;
      const node = og.timelineNodes[timelineId];

      // hide all children
      for (const childId of node.children) {
        const childNode = og.timelineNodes[childId];
        this.#applyMode(childId, this.#getHideMode(childNode));
      }
    }
  };

  #applyMode(timelineId, mode) {
    const { og } = this;
    const node = og.timelineNodes[timelineId];
    if (ddgQueries.canApplySummaryMode(this, node, mode)) {
      this.summaryModes[timelineId] = mode;
      this.propagateSummaryMode[mode](timelineId);
      return true;
    }
    return false;
  }


  /** ###########################################################################
   * build
   * ##########################################################################*/

  /**
   * @param {number[]} watchTraceIds 
   */
  build(watched) {
    if (!this.og) {
      this.og = new BaseDDG(this.ddgSet, this.graphId);
    }
    this.buildStage = BuildStage.Building;
    try {
      this.og.build(watched);
    }
    finally {
      this.buildStage = BuildStage.None;
    }

    this.buildStage = BuildStage.Summarizing;
    try {
      this.#initSummaryConfig();
      this.#buildSummarizedGraph();
    }
    finally {
      this.buildStage = BuildStage.None;
    }
  }

  /**
   * During initial build, not all details of every node are prepared.
   * When investigating a node's details, this function needs to run first.
   */
  #buildNodeSummary(timelineId, summaryCfg) {
    return this.#buildNodeSummarySnapshotsAndVars(timelineId, summaryCfg);
  }

  /** ###########################################################################
   * more reset + init stuff
   * ##########################################################################*/

  resetBuild() {
    this.resetEdges(); // only reset (set) edges
  }

  #initSummaryConfig() {
    this.summaryModes = {};

    // update node modes
    this.#applyMode(DDGRootTimelineId, RootDefaultSummaryMode);
  }

  /**
   * Used for nodes that are summarized by traceId.
   */
  #getSummarizingTraceId(dataNodeId) {
    const dataNode = this.dp.util.getDataNode(dataNodeId);
    return dataNode.varAccess?.declarationTid || dataNode.traceId;
  }

  /**
   * @param {number} timelineId Summary group node
   */
  #buildNodeSummarySnapshotsAndVars(timelineId, summaryCfg) {
    const { dp } = this;
    const node = this.timelineNodes[timelineId];
    if (
      !node.hasSummarizableWrites ||
      // only non-root control groups
      (isDDGRoot(timelineId) || !isControlGroupTimelineNode(node.type))
      // ||
      // this.nodeSummaries[timelineId] // TODO: account for different summaryCfgs
    ) {
      // already built or nothing to build
      return this.nodeSummaries[timelineId];
    }

    const lastModifyNodesByRefId = new Map();           // summary ref set
    const varModifyOrReturnDataNodes = new Map();       // summary var + return set
    const lastNestedDataNodeId = this.#gatherNestedUniqueSummaryTrees(node, node, lastModifyNodesByRefId, varModifyOrReturnDataNodes, summaryCfg);

    if (DDGTimelineNodeType.is.Context(node.type)) {
      // add return input argument
      const returnInputDataNodeId = dp.util.getReturnArgumentInputDataNodeIdOfContext(node.contextId);
      if (returnInputDataNodeId) {
        const returnDataNode = dp.util.getDataNode(returnInputDataNodeId);
        if (!lastModifyNodesByRefId.get(returnDataNode.refId)) { // don't add if we already have a ref summary of it
          const skippedNode = this.timelineBuilder.getSkippedByNode(returnDataNode);
          const timelineNodes = this.getTimelineNodesOfDataNode(returnInputDataNodeId);
          const returnVarTid = returnDataNode.varAccess?.declarationTid || returnDataNode.traceId;
          if (skippedNode || timelineNodes) {
            const returnNode = skippedNode || last(timelineNodes);
            const returnTimelineId = returnNode.timelineId;
            if (
              ddgQueries.checkNodeVisibilitySettings(this, returnNode) &&
              // hackfix: don't accidentally grab nodes from other summary groups (in case of skip)
              returnTimelineId > timelineId
            ) {
              if (isSnapshotTimelineNode(returnNode.type)) {
                lastModifyNodesByRefId.set(returnNode.refId, returnNode.dataNodeId);
              }
              else {
                // always override previous, because its always last
                varModifyOrReturnDataNodes.set(returnVarTid, returnTimelineId);
              }
            }
          }
        }
      }
    }

    // filter out unwanted refs
    const summaryRefEntries = Array.from(lastModifyNodesByRefId.entries())
      .filter(([refId]) => {
        if (!this.settings.connectedOnly) {
          // no constraint → just show everything
          return true;
        }

        if (summaryCfg.isShallow) {
          // in case of nested group summaries, don't try to hide things
          return true;
        }

        if (this.watchSet.lastDataNodeByWatchedRefs.get(refId)) {
          // always show watched refs
          return true;
        }

        // skip if this ref is only used internally (or before) this summary group and is not accessed AFTERWARDS.
        const lastDataNodeIdOfRef = Math.max(
          // check if accessed again
          dp.util.getLastDataNodeByRefId(refId)?.nodeId || 0
        );
        if (lastDataNodeIdOfRef > lastNestedDataNodeId) {
          return true;
        }

        // check connected-ness
        return this.og._connectedRefIds.has(refId);
      });

    // TODO: not good enough to determine "deep access"
    // const accessedAccessIds = new Set(
    //   summaryRefEntries.map(([refId, dataNodeId]) => {
    //     const dataNode = this.dp.util.getDataNode(dataNodeId);
    //     return dataNode.accessId;
    //   })
    // );

    // add ref snapshots
    /**
     * @type {SnapshotMap}
     */
    const snapshotCfg = new PDGSnapshotConfig();
    // NOTE: a lot of data points will come from before the node, and we want those, too
    // snapshotCfg.fromTraceId = node.pushTid;
    const summaryRefIds = new Set(summaryRefEntries.map(([refId]) => refId));

    snapshotCfg.beforeChildren = (parentSnapshot, lastModsByProp) => {
      for (const [key, n] of Object.entries(lastModsByProp)) {
        if (n.traceId < node.pushTid && isDataNodeDelete(n.type)) {
          // we don't want deletes from before the node to be summarized
          delete lastModsByProp[key];
        }
      }
    };

    snapshotCfg.shouldBuildDeep = (parentSnapshot, dataNode) => {
      return (
        // go deep if it should be summarized
        summaryRefIds.has(dataNode.refId) &&
        // and it is not already summarized
        !snapshotCfg.snapshotsByRefId.has(dataNode.refId)
      );
    };

    // snapshotCfg.nodeBuilt = (newNode, parentSnapshot) => {
    // };
    for (const [refId, dataNodeId] of summaryRefEntries) {
      if (snapshotCfg.snapshotsByRefId.has(refId)) {
        // skip if this ref was already added as a descendant of a previous ref
        continue;
      }
      const dataNode = dp.collections.dataNodes.getById(dataNodeId);
      const newNode = this.og.addNewRefSnapshot(dataNode, refId, snapshotCfg, null);
      this._setConnectedDFS(newNode);

      // override label to be the var name (if possible), since its more representative
      //      than the label of a random DataNode belonging to the ref
      newNode.label = dp.util.findDataNodeAccessedRefVarName(newNode.dataNodeId) || newNode.label;
    }

    // add var + compute nodes
    const varNodesByTid = new Map();
    for (const [declarationTid, varOrReturnNodeTimelineId] of varModifyOrReturnDataNodes) {
      const origNode = this.timelineNodes[varOrReturnNodeTimelineId];
      if (origNode.refId && lastModifyNodesByRefId.has(origNode.refId)) {
        continue;
      }
      const newNode = this.cloneNode(varOrReturnNodeTimelineId);
      // NOTE: we are already cloning `connected` state
      // future-work: consider what it means if a different write of this var is connected, but not this final write in summarized group

      // override label to be the var name (if possible), since its more representative
      newNode.label = dp.util.getDataNodeDeclarationVarName(newNode.dataNodeId) || newNode.label;
      const summarizingTraceId = this.#getSummarizingTraceId(newNode.dataNodeId);
      varNodesByTid.set(summarizingTraceId, newNode.timelineId);
    }

    const summaryRoots = (
      // ref roots
      Array.from(snapshotCfg.snapshotsByRefId.values())
        .filter(snapshotId => !this.timelineNodes[snapshotId].parentNodeId)
        .concat(
          // var roots
          Array.from(varNodesByTid.values())
        ));

    return this.nodeSummaries[timelineId] = new DDGNodeSummary(timelineId, snapshotCfg.snapshotsByRefId, varNodesByTid, summaryRoots);
  }

  /**
   * Finds all nested modified `refId`s nested in the given node and its descendants.
   * 
   * @param {DDGTimelineNode} summarizingNode
   * @param {DDGTimelineNode} node
   * @param {Map.<number, number>} lastModifyNodesByRefId
   * 
   * @return {number} The `lastDataNodeId` of the entire node.
   */
  #gatherNestedUniqueSummaryTrees(summarizingNode, node, lastModifyNodesByRefId, varModifyOrReturnDataNodes, summaryCfg, depth = 0) {
    const { dp } = this;
    let lastDataNodeId = node.dataNodeId;

    if (
      node.dataNodeId &&
      ddgQueries.checkNodeVisibilitySettings(this, node)
    ) {
      const refId = dp.util.getDataNodeModifyingRefId(node.dataNodeId);
      if (refId) {
        // Ref Write
        // NOTE: we take `max` here because:
        //    In case of nested watched nodes that adopted nodes (i.e. return watched nodes), not in order,
        //      `dataNodeId`s are not ordered with `timelineId`s.
        //
        const prev = lastModifyNodesByRefId.get(refId) || 0;
        const targetDataNodeId = Math.max(node.dataNodeId, prev);
        const refName = dp.util.guessAccessedRefVarName(targetDataNodeId);
        // console.debug(`ref summary: n${targetDataNodeId} "${refName}"`);
        if (refName !== '_ref') { // hackfix: this is to hide stupid `babel` artifacts coming from destructuring patterns
          lastModifyNodesByRefId.set(refId, targetDataNodeId);
        }
      }
      else {
        const dataNode = dp.collections.dataNodes.getById(node.dataNodeId);
        const varDeclarationTid = isDataNodeModifyOrComputeType(dataNode.type) && dataNode?.varAccess?.declarationTid;
        const isPreexistingVar = varDeclarationTid && (!summarizingNode.pushTid || varDeclarationTid < summarizingNode.pushTid);
        if (
          // Pre-existing variable Write or Compute
          isPreexistingVar
        ) {
          // store variable writes, if variable was declared before summarizingNode
          varModifyOrReturnDataNodes.set(varDeclarationTid, node.timelineId);
        }
      }
    }
    if (node.children) {
      if (
        !isControlGroupTimelineNode(node.type) ||
        (!summaryCfg.isShallow || depth < summaryCfg.maxGroupDepth)
      ) {
        for (const childId of Object.values(node.children).sort((a, b) => a - b)) {
          const childNode = this.timelineNodes[childId];
          const lastChildDataNodeId = this.#gatherNestedUniqueSummaryTrees(summarizingNode, childNode, lastModifyNodesByRefId, varModifyOrReturnDataNodes, summaryCfg, depth + 1);
          if (lastChildDataNodeId) {
            // console.debug(`lastDataNodeId #${summarizingNode.timelineId} at #${node.timelineId}/${childId}: ${lastDataNodeId} → ${lastChildDataNodeId}`);
            lastDataNodeId = Math.max(lastDataNodeId || 0, lastChildDataNodeId);
          }
        }
      }
    }
    return lastDataNodeId;
  }

  /** ###########################################################################
   *  summarize algo
   * ##########################################################################*/

  #buildSummarizedGraph() {
    const { og: { root } } = this;

    this.resetBuild();

    hackfixCleanupBeforeSummary(this);

    const summaryState = new SummaryState();
    this.#summarizeDFS(root, summaryState);

    // // NOTE: store SummaryState for debugging purposes
    // this.graphSummaryState = summaryState;

    // add all edges
    for (const [from, toMap] of summaryState.visibleEdges) {
      for (const [to, edgeState] of toMap) {
        const edgeType = this.getEdgeType(this.timelineNodes[from], this.timelineNodes[to]);
        this.addEdge(edgeType, from, to, edgeState);
      }
    }

    this.#notifyUpdate();
    this.ddgSet._notifyUpdate(this);
  }

  #notifyUpdate = throttle(() => {
    this._emitter.emit('update', this);
  });

  onUpdate(cb) {
    return this._emitter.on('update', cb);
  }

  /**
   * @param {DDGTimelineNode} node 
   * @param {SummaryState} summaryState
   * 
   * @return {boolean} Whether `node` has own or nested summaries.
   */
  #summarizeDFS(node, summaryState) {
    const { dp } = this;
    let {
      nodeRouteMap,
      currentCollapsedAncestor,
      isAncestorShallowSummarized
    } = summaryState;
    const { timelineId, dataNodeId, children } = node;
    const mode = this.summaryModes[timelineId];

    const isSummarizedMode = ddgQueries.isNodeSummarizedMode(this, node);
    const isShallowSummarizedGroup = isShallowExpandedMode(mode);

    /**
     * Sometimes, a node might be visible but also summarized.
     */
    let isSummarizedAndVisible = (
      !!currentCollapsedAncestor &&
      (
        // don't try to summarize watched nodes
        node.watched ||

        // allow summarization for nested group nodes
        (isSummarizedMode && isAncestorShallowSummarized)
      )
    );
    if (isSummarizedAndVisible) {
      currentCollapsedAncestor = null;
    }

    // build summary
    if (!currentCollapsedAncestor) {
      // build node summary (if not already built)
      let summaryCfg = isShallowSummarizedGroup ? ShallowSummaryConfig : DefaultSummaryConfig;
      this.#buildNodeSummary(timelineId, summaryCfg);
      // if (!ddgQueries.doesNodeHaveSummary(this, node)) {
      //   // straight up ignore for now
      //   return;
      // }
    }



    // DFS recursion
    let hasNestedSummaries = false;
    if (children) {
      const isCollapsed =
        !isDDGRoot(timelineId) &&
        (!currentCollapsedAncestor || isAncestorShallowSummarized) &&
        ddgQueries.isNodeSummarizedMode(this, node);
      // ddgQueries.doesNodeHaveSummary(this, node);
      if (isCollapsed) {
        // node is collapsed and has summary data (if not, just hide children)
        summaryState.currentCollapsedAncestor = node;
        summaryState.isAncestorShallowSummarized = isShallowSummarizedGroup;
      }
      for (const childId of Object.values(children)) {
        const childNode = this.og.timelineNodes[childId];
        hasNestedSummaries = this.#summarizeDFS(childNode, summaryState) || hasNestedSummaries;
      }
      if (isCollapsed) {
        // reset collapsed ancestor
        summaryState.currentCollapsedAncestor = null;
        summaryState.isAncestorShallowSummarized = isAncestorShallowSummarized;
      }
    }

    let isVisible = !!currentCollapsedAncestor || ddgQueries.isVisible(this, node);
    let targetNode = currentCollapsedAncestor || node;

    // update `hasNestedSummaries`
    const nodeSummary = this.nodeSummaries[targetNode.timelineId];
    if (nodeSummary && hasNestedSummaries) {
      nodeSummary.hasNestedSummaries = hasNestedSummaries;
    }

    let isSummarized = (
      (!!currentCollapsedAncestor || ddgQueries.isNodeSummarized(this, node))
    );

    // find summary targetNode (if it has any)
    let hasOwnSummary = false;
    if (isSummarized) {
      if (
        // summarized nodes without own `dataNodeId` (such as groups) are simply hidden
        !dataNodeId ||
        // summarization is empty → hide it (for now)
        !ddgQueries.doesNodeHaveSummary(this, targetNode)
      ) {
        targetNode = null;
        isVisible = false;
      }
      else {
        hasOwnSummary = true;
        const dataNode = dp.collections.dataNodes.getById(dataNodeId);
        // link to summaryNode instead of `targetNode`
        targetNode = this.#lookupSummaryNode(dataNode, nodeSummary);
        if (
          !targetNode ||
          !ddgQueries.isVisible(this, targetNode)
        ) {
          // NOTE: we simply "hide" nodes that do not have a summarized representation (leads to its edges getting propagated)
          isVisible = false;
        }
      }
    }

    // add/merge incoming edges
    const incomingEdges = this.og.inEdgesByTimelineId[timelineId] || EmptyArray;

    if (VerboseSumm && (
      !this.debugValueId || dp.collections.dataNodes.getById(dataNodeId)?.valueId === this.debugValueId) &&
      (isVisible || isSummarized || incomingEdges?.length)) {
      // eslint-disable-next-line max-len
      this.logger.debug(`Summarizing ${timelineId}, n${targetNode?.dataNodeId}, t=${targetNode?.timelineId}, col=${currentCollapsedAncestor?.timelineId}, vis=${isVisible}, summarized=${isSummarized}, incoming=${incomingEdges?.join(',')}`);
      // console.debug(`DDG-SUMM: #${timelineId} ${node.label}, sum: ${isSummarized}, c: ${!!children}, vis: ${isVisible}`);
    }

    if (isVisible) {
      // node is (1) shown, (2) collapsed into `currentCollapsedAncestor` or (3) summarized

      if (isSummarizedAndVisible) {
        this.#rerouteHiddenNode(timelineId, nodeRouteMap);
      }
      else {
        nodeRouteMap.set(timelineId, new Set([targetNode]));
      }

      for (const edgeId of incomingEdges) {
        const edge = this.og.edges[edgeId];
        const { from: fromOg, type } = edge;
        const allFrom = nodeRouteMap.get(fromOg);
        if (allFrom) {
          for (const from of allFrom) {
            if (from !== targetNode) {
              summaryState.addEdge(from, targetNode, type);
              if (VerboseSumm && (
                !this.debugValueId || dp.collections.dataNodes.getById(dataNodeId)?.valueId === this.debugValueId)) {
                this.logger.debug(`  SUMM at ${timelineId}, new edge: ${from.timelineId} -> ${targetNode.timelineId}`);
              }
            }
          }
        }
      }
    }
    else {
      // node is hidden
      this.#rerouteHiddenNode(timelineId, nodeRouteMap);
    }

    return hasOwnSummary || hasNestedSummaries;
  }

  #rerouteHiddenNode(timelineId, nodeRouteMap) {
    const incomingEdges = this.og.inEdgesByTimelineId[timelineId] || EmptyArray;
    // → multicast all outgoing edges to all incoming edges
    // → to that end, add all `from`s to this node's `reroutes`
    /**
     * @type {Set.<DDGTimelineNode>}
     */
    let reroutes = new Set();
    for (const edgeId of incomingEdges) {
      const edge = this.og.edges[edgeId];
      const { from: fromOg, type } = edge;
      // TODO: summarize edge type correctly
      const allFrom = nodeRouteMap.get(fromOg);
      if (allFrom) {
        for (const from of allFrom) {
          reroutes.add(from);
        }
      }
    }
    if (reroutes.size) {
      nodeRouteMap.set(timelineId, reroutes);
    }
    // eslint-disable-next-line max-len
    const { dp } = this.ddgSet;
    if (VerboseSumm && (
      !this.debugValueId || dp.util.getDataNode(this.timelineNodes[timelineId]?.dataNodeId)?.valueId === this.debugValueId)
    ) {
      reroutes.size && this.logger.debug(`SUMM at ${timelineId}, added re-routes:\n  ${Array.from(reroutes).map(n => `${n.timelineId} (${n.label})`).join(',')}`);
      // VerboseSumm && this.logger.debug(`SUMM at ${timelineId}, nodeRouteMap:\n  ${Array.from(nodeRouteMap.entries())
      //   .map(([timelineId, reroutes]) =>
      //     `${timelineId} → ${Array.from(reroutes).map(n => `${n.timelineId} (${n.label})`).join(',')}`).join('\n  ')}`);
    }
  }

  /**
   * @param {DataNode} dataNode 
   * @param {DDGNodeSummary} nodeSummary
   * 
   * @return {DDGTimelineNode}
   */
  #lookupSummaryNode(dataNode, nodeSummary) {
    const accessedRefId = this.dp.util.getDataNodeAccessedRefId(dataNode.nodeId);
    if (accessedRefId) {
      // node is summarized by snapshot child node
      const { prop } = dataNode.varAccess;
      const snapshotId = nodeSummary.snapshotsByRefId.get(accessedRefId);
      if (snapshotId) {
        const snapshot = this.timelineNodes[snapshotId];
        const childId = snapshot.children[prop];
        return this.timelineNodes[childId];
      }
    }

    // node is summarized by some type of traceId
    const summarizingTraceId = this.#getSummarizingTraceId(dataNode.nodeId);
    const summarizingTimelineId = summarizingTraceId && nodeSummary.nodesByTid.get(summarizingTraceId);
    if (summarizingTimelineId) {
      return this.timelineNodes[summarizingTimelineId];
    }
    return null;
  }
}
