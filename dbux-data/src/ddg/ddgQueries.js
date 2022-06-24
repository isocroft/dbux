import DDGTimelineNodeType, { isControlGroupTimelineNode } from '@dbux/common/src/types/constants/DDGTimelineNodeType';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import TraceType from '@dbux/common/src/types/constants/TraceType';
import { isDDGRoot } from './constants';
import DDGSummaryMode, { isSummaryMode, isCollapsedMode, isShownMode, isExpandedMode } from './DDGSummaryMode';
import { DDGTimelineNode } from './DDGTimelineNodes';
import DDGNodeSummary from './DDGNodeSummary';
import DDGSettings from './DDGSettings';

/** @typedef { import("./BaseDDG").default } BaseDDG */
/** @typedef { import("./DataDependencyGraph").default } DataDependencyGraph */

export class RenderState {
  /**
   * @type {Array.<DDGTimelineNode>}
   */
  timelineNodes;

  /**
   * @type {DDGEdge[]}
   */
  edges;

  /**
   * Maps `timelineId` to array of `edgeId`.
   * @type {Object.<number, number[]>}
   */
  outEdgesByTimelineId;

  /**
   * Maps `timelineId` to array of `edgeId`.
   * @type {Object.<number, number[]>}
   */
  inEdgesByTimelineId;

  /**
   * @type {Object.<number, SummaryModeValue>}
   */
  summaryModes;

  /**
   * Summary data by `timelineId`.
   * NOTE: This is built lazily in `buildNodeSummary`, and not available until a Node has been explicitly summarized.
   * 
   * @type {Object.<number, DDGNodeSummary>}
   */
  nodeSummaries;

  /**
   * @type {DDGSettings}
   */
  settings;
}

/** ###########################################################################
 * {@link _canApplySummaryMode}
 * ##########################################################################*/

const _canApplySummaryMode = {
  [DDGSummaryMode.Show]: (ddg, node) => {
    return (
      !!node.dataNodeId && // ← implies that root is excluded
      !node.watched // cannot change state of watched nodes
    );
  },
  [DDGSummaryMode.Hide]: (ddg, node) => {
    return (
      !isDDGRoot(node.timelineId) && // cannot hide the root
      !node.watched // cannot change state of watched nodes
    );
  },
  [DDGSummaryMode.Collapse]: (ddg, node) => {
    return !isDDGRoot(node.timelineId) &&
      isControlGroupTimelineNode(node.type);
  },
  /**
   * 
   * @param {DDGTimelineNode} node 
   */
  [DDGSummaryMode.CollapseSummary]: (ddg, node) => {
    // TODO: improve this
    // eslint-disable-next-line no-use-before-define
    return ddgQueries.isNodeSummarizable(ddg, node);
  },
  [DDGSummaryMode.ExpandSelf]: (ddg, node) => {
    return isControlGroupTimelineNode(node.type) && !!node.children.length;
  },
  [DDGSummaryMode.ExpandSelf1]: (ddg, node) => {
    return isControlGroupTimelineNode(node.type) && !!node.children.length;
  },
  [DDGSummaryMode.ExpandSelf2]: (ddg, node) => {
    return isControlGroupTimelineNode(node.type) && !!node.children.length;
  },
  [DDGSummaryMode.ExpandSelf3]: (ddg, node) => {
    return isControlGroupTimelineNode(node.type) && !!node.children.length;
  },
  [DDGSummaryMode.ExpandSelf4]: (ddg, node) => {
    return isControlGroupTimelineNode(node.type) && !!node.children.length;
  },
  [DDGSummaryMode.ExpandSubgraph]: (ddg, node) => {
    return isControlGroupTimelineNode(node.type) && !!node.children.length;
  },
  [DDGSummaryMode.HideChildren]: (ddg, node) => {
    // only applies to root (all other nodes are "collapse"d instead)
    return isDDGRoot(node.timelineId) || node.watched;
  }
};

/** ###########################################################################
 * {@link ddgQueries}
 * ##########################################################################*/

/**
 * Queries shared to be used before and after serialization.
 * (Similar to what `dataProviderUtil` is to `RuntimeDataProvider`.)
 */
const ddgQueries = {
  /**
   * @param {RenderState} ddg 
   * @param {RenderState} timelineId
   * @return {DDGTimelineNode}
   */
  getTimelineNode(ddg, timelineId) {
    return ddg.timelineNodes[timelineId];
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  getNodeSummaryMode(ddg, node) {
    return ddg.summaryModes[node.timelineId];
  },

  /**
   * WARNING: This does not work on summary nodes (would need to check !node.og as well).
   * 
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isNodeConnected(ddg, node) {
    // NOTE: group nodes generally don't have edges
    return node.connected || (
      isControlGroupTimelineNode(node.type)
    );
  },

  /**
   * Check node connected-ness against connected setting.
   * 
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  checkConnected(ddg, node) {
    return (
      // connected only
      (ddg.settings.connectedOnly && ddgQueries.isNodeConnected(ddg, node)) ||

      // even if not connected, node must have at least one edge
      // TODO: client has no access to og, and summarization checks this before edges are built
      (!ddg.settings.connectedOnly /* && (
        !!ddg.og.inEdgesByTimelineId[node.timelineId]?.length ||
        !!ddg.og.outEdgesByTimelineId[node.timelineId]?.length
      ) */)
    );
  },

  /**
   * Check node param status against param setting.
   * 
   * @param {DDGTimelineNode} node
   */
  checkParams(ddg, node) {
    return ddg.settings.params || !TraceType.is.Param(node.traceType);
  },

  /**
   * Check settings against node status.
   * 
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  checkNodeVisibilitySettings(ddg, node) {
    return node.watched ||  // don't hide watched nodes
      (
        ddgQueries.checkConnected(ddg, node) &&
        ddgQueries.checkParams(ddg, node)
      );
  },


  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isVisible(ddg, node) {
    return node.watched || (
      // check summary status
      (
        // summarized nodes don't have a summary status
        !node.og ||
        (
          // og node must be shown
          isShownMode(ddg.summaryModes[node.timelineId]) &&
          // and summarized og group nodes must have a non-empty summary
          (!ddgQueries.isNodeSummarizedMode(ddg, node) || ddgQueries.doesNodeHaveSummary(ddg, node))
        )
      ) &&
      ddgQueries.checkNodeVisibilitySettings(ddg, node)
    );
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isCollapsed(ddg, node) {
    const summaryMode = ddg.summaryModes[node.timelineId];
    return isCollapsedMode(summaryMode);
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isExpandedGroupNode(ddg, node) {
    const summaryMode = ddg.summaryModes[node.timelineId];
    return isControlGroupTimelineNode(node.type) &&
      isExpandedMode(summaryMode);
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  canNodeExpand(ddg, node) {
    // ddgQueries.getSummarizableChildren(this, node.timelineId).length
    // return ddgQueries.isNodeSummarizable(ddg, node) && 
    //   ;
    return ddgQueries.canApplySummaryMode(ddg, node, DDGSummaryMode.ExpandSelf);
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  hasSummarizableChildren(ddg, node) {
    return !!ddgQueries.getSummarizableChildren(ddg, node.timelineId).length;
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  getSummarizableChildren(ddg, timelineId) {
    const node = ddg.timelineNodes[timelineId];
    return Object.values(node.children || EmptyObject)
      .map(childId => {
        const child = ddg.timelineNodes[childId];
        return ddgQueries.isNodeSummarizable(ddg, child) ? child : null;
      })
      .filter(Boolean);
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isSnapshot(ddg, node) {
    return node.type === DDGTimelineNodeType.RefSnapshot;
  },

  isDeleteNode(ddg, node) {
    return node.type === DDGTimelineNodeType.DeleteEntry;
  },

  /**
   * Whether given node is a snapshot that has at least one nested snapshot.
   * 
   * @param {RenderState} ddg 
   * @param {DDGSnapshotNode} node 
   */
  isNestingSnapshot(ddg, node) {
    return ddgQueries.isSnapshot(ddg, node) &&
      Object.values(node.children).some(childId => ddgQueries.isSnapshot(ddg, ddg.timelineNodes[childId]));
  },

  /** ###########################################################################
   * "advanced" queries
   * ##########################################################################*/

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  getRootTimelineNode(ddg, node) {
    return node?.rootTimelineId && ddg.timelineNodes[node.rootTimelineId];
  },

  /** ###########################################################################
   * Summary queries
   *  #########################################################################*/

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isNodeSummarized(ddg, node) {
    return ddgQueries.isNodeSummarizedMode(ddg, node) &&
      ddgQueries.doesNodeHaveSummary(ddg, node);
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isNodeSummarizedMode(ddg, node) {
    const summaryMode = ddg.summaryModes[node.timelineId];
    return isSummaryMode(summaryMode);
  },

  /**
   * Whether the summary of this node has already been prepared.
   * 
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  doesNodeHaveSummary(ddg, node) {
    const nodeSummary = ddg.nodeSummaries[node.timelineId];
    if (!nodeSummary) {
      return false;
    }
    return !!nodeSummary.summaryRoots?.length || nodeSummary.hasNestedSummaries;
  },

  wasNodeSummarizedBefore(ddg, node) {
    const nodeSummary = ddg.nodeSummaries[node.timelineId];
    return !!nodeSummary;
  },

  /**
   * WARNING: This will check "summarizability" recursively
   * 
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isNodeSummarizable(ddg, node) {
    return (
      !isDDGRoot(node.timelineId) &&
      node.hasSummarizableWrites && (
        !isControlGroupTimelineNode(node.type) ||
        (
          // it itself can be summarized
          (
            // we don't know yet
            !ddgQueries.wasNodeSummarizedBefore(ddg, node) ||

            // actually check if summary is non-empty
            ddgQueries.doesNodeHaveSummary(ddg, node)
          ) ||
          // children can be summarized
          (
            ddgQueries.hasSummarizableChildren(ddg, node)
          )
        )
      )
    );
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  getVisibleSummary(ddg, node) {
    const isSummarized = ddgQueries.isNodeSummarized(ddg, node);
    if (isSummarized) {
      return ddg.nodeSummaries[node.timelineId];
    }
    return null;
  },

  /**
   * Returns summary roots.
   * 
   * @param {RenderState} ddg 
   * @param {DDGNodeSummary} summary
   */
  getSummaryRoots(ddg, summary) {
    const rootIds = summary.summaryRoots;
    return rootIds?.map(id => ddg.timelineNodes[id]);
  },

  /**
   * Returns *all* snapshots in summary.
   * 
   * @param {RenderState} ddg 
   * @param {DDGNodeSummary} summary
   */
  getSummarySnapshots(ddg, summary) {
    const summaryNodeIds = Array.from(summary.snapshotsByRefId.values());
    return summaryNodeIds.map(id => ddg.timelineNodes[id]);
  },

  /**
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   * @return {DDGNodeSummary} Summary of first summarized ancestor node.
   */
  getSummarizedGroupOfNode(ddg, node) {
    let current = node;
    while (current && !ddgQueries.isNodeSummarizedMode(ddg, current) && current.groupId) {
      current = ddg.timelineNodes[current.groupId];
    }
    return current && ddg.nodeSummaries[current.timelineId] || null;
  },

  /** ###########################################################################
   * Handle summary modes
   * ##########################################################################*/

  /**
   * @param {BaseDDG} ddg 
   */
  canApplySummaryMode(ddg, node, mode) {
    // const node = ddg.timelineNodes[timelineId];
    if (!_canApplySummaryMode[mode]) {
      throw new Error(`SummaryMode has not been configured: ${mode}`);
    }
    return _canApplySummaryMode[mode](ddg, node);
  },

  /** ###########################################################################
   * util
   * ##########################################################################*/

  /**
   * NOTE: this excludes ValueNodes nodes inside of summary snapshots.
   * 
   * @param {RenderState} ddg 
   */
  getAllVisibleNodes(ddg) {
    return ddg.timelineNodes
      // filter visible
      .filter(node => !!node && ddgQueries.isVisible(ddg, node))

      // add all summary nodes
      .concat(Object.values(ddg.nodeSummaries || EmptyObject).map(summary => {
        return summary && ddgQueries.getSummarySnapshots(ddg, summary);
      }))
      .filter(Boolean)
      .flat();
  },

  /**
   * 
   * @param {RenderState} ddg 
   * @param {DDGTimelineNode} node
   */
  isSnapshotRoot(ddg, node) {
    return node.rootTimelineId && !node.parentNodeId;
  },

  /**
   * Whether `inner` is descendant of `outer`
   * 
   * @param {RenderState} ddg
   * @param {RefSnapshotTimelineNode} outer
   * @param {RefSnapshotTimelineNode} inner
   */
  isSnapshotDescendant(ddg, outer, inner) {
    const { parentNodeId } = inner;
    if (!parentNodeId) {
      return false;
    }
    const parentNode = ddg.timelineNodes[parentNodeId];
    if (parentNode === outer) {
      return true;
    }

    return ddgQueries.isSnapshotDescendant(ddg, outer, parentNode);
  },
};

/** ###########################################################################
 * host queries
 * ##########################################################################*/

/**
 * Queries that are only supported on the host, due to
 * dependencies on `dp` etc.
 */
export const ddgHostQueries = {
  /**
   * @param {DataDependencyGraph} ddg 
   * @param {DDGTimelineNode} node
   */
  getRootDataNodeId(ddg, node) {
    const rootTimelineNode = ddgQueries.getRootTimelineNode(ddg, node);
    return rootTimelineNode?.dataNodeId || node.dataNodeId;
  },

  /**
   * @param {DataDependencyGraph} ddg 
   * @param {DDGTimelineNode} node
   */
  getRootDataNode(ddg, node) {
    const rootDataNodeId = ddgHostQueries.getRootDataNodeId(ddg, node);
    return rootDataNodeId && ddg.dp.util.getDataNode(rootDataNodeId);
  },

  /**
   * NOTE: a snapshot (as of now) cannot have children of a later trace than its root.
   * 
   * @param {DataDependencyGraph} ddg 
   * @param {DDGTimelineNode} node
   */
  getLastDataNodeIdInRoot(ddg, node) {
    const rootDataNode = ddgHostQueries.getRootDataNode(ddg, node);
    const rootTrace = rootDataNode.traceId;
    return ddg.dp.util.getLastDataNodeIdOfTrace(rootTrace);
  }
};

export default ddgQueries;
