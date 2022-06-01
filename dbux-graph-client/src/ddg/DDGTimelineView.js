import * as jsPlumbBrowserUI from '@jsplumb/browser-ui';
import { AnchorLocations } from '@jsplumb/common';
import { BezierConnector } from '@jsplumb/connector-bezier';

import { RootTimelineId } from '@dbux/data/src/ddg/constants';
import DDGSummaryMode from '@dbux/data/src/ddg/DDGSummaryMode';
import ddgQueries, { RenderState } from '@dbux/data/src/ddg/ddgQueries';
import DDGTimelineNodeType, { isControlGroupTimelineNode, isDataTimelineNode } from '@dbux/common/src/types/constants/DDGTimelineNodeType';
import { compileHtmlElement, delegate } from '../util/domUtil';
import { decorateSummaryModeButtons, makeSummaryButtons } from './ddgDomUtil';
import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';

// const AutoLayoutAnimationDuration = 300;
// const labelSize = 24;

const XPadding = 30;
const YPadding = 30;
// const XGap = 8;
// const YGap = 15;
const YGroupPadding = 4;

const NodeMenuHeight = 12;
// const NodeHeight = 20;
// const NodeWidth = 40;

let documentMouseMoveHandler;

function getElTopOffset(el) {
  const s = getComputedStyle(el, null);
  const b = parseFloat(s.getPropertyValue('border-top-width')) || 0;
  const m = parseFloat(s.getPropertyValue('margin-top-width')) || 0;
  return b + m;
}

function getElLeftOffset(el) {
  const s = getComputedStyle(el, null);
  const b = parseFloat(s.getPropertyValue('border-left-width')) || 0;
  const m = parseFloat(s.getPropertyValue('margin-left-width')) || 0;
  return b + m;
}

export default class DDGTimelineView extends ClientComponentEndpoint {
  /**
   * @type {Element}
   */
  currentHoverEl;

  currentHoverNode;

  get doc() {
    return this.context.doc;
  }

  createEl() {
    return compileHtmlElement(/*html*/`<div class="timeline-view timeline-jsplumb-container">
      <div data-el="status"></div>
      <!-- <div data-el="view" class="timeline-view timeline-sigma-container"></div> -->
      <!-- <div data-el="view" class="timeline-view timeline-jsplumb-container"></div> -->
    </div>`);
  }

  setupEl() {
    this.initGraphImplementation();

    delegate(this.el, 'div.timeline-node', 'click', async (nodeEl) => {
      const timelineId = parseInt(nodeEl.dataset.timelineId, 10);
      if (timelineId) {
        const node = this.renderState.timelineNodes[timelineId];
        if (node.dataNodeId) {
          await this.remote.selectNode(timelineId);
        }
      }
    });

    this.refreshGraph();
  }

  update() {
    this.refreshGraph();
  }

  refreshGraph() {
    const { failureReason } = this.renderState;
    // update status message
    if (failureReason) {
      this.els.status.classList.add('alert', 'alert-danger');
      // this.els.status.className = 'alert alert-danger';
      this.els.status.textContent = 'Cannot build DataDependencyGraph: ' + failureReason;
    }
    else {
      this.els.status.classList.remove('alert', 'alert-danger');
      this.els.status.textContent = '';
    }

    // TODO: don't rebuild entire graph on every update
    this.rebuildGraph();
  }

  /** ###########################################################################
   * popups
   * ##########################################################################*/

  _removeNodePopup(hoverEl) {
    if (this.currentHoverEl !== hoverEl) { // race condition check
      return;
    }
    this.currentHoverEl?.remove();
    this.currentHoverEl = null;
    this.currentHoverNode = null;

    if (documentMouseMoveHandler) {
      document.removeEventListener('mousemove', documentMouseMoveHandler);
    }
  }

  /**
   * @param {DDGTimelineNode} node 
   * @param {Element} nodeEl 
   */
  makeNodeButtons(node) {
    // TODO: generate correct `modesForThisNode` (maybe simply use ddgQueries.canApplySummaryMode)
    // TODO: make sure, the buttons work correctly
    const modesForThisNode = [DDGSummaryMode.ExpandSelf, DDGSummaryMode.CollapseSummary];
    const el = compileHtmlElement(/*html*/`
      <div class="flex-row" style="flex-shrink: 1; justify-content: flex-start;">
      </div>
    `);

    const { el: btns } = makeSummaryButtons(this.doc, node.timelineId, 'btn btn-primary no-padding', modesForThisNode);
    el.appendChild(btns);

    return el;
  }

  /**
   * @param {DDGTimelineNode} node 
   * @param {Element} nodeEl 
   */
  maybeShowNodePopupEl(node, nodeEl) {
    if (node === this.currentHoverNode) {
      return;
    }

    this._removeNodePopup(this.currentHoverEl);

    const rect = nodeEl.getBoundingClientRect();
    /**
     * NOTE: `y` is more annoying to get right.
     * @see https://stackoverflow.com/questions/28966678/getboundingclientrect-returning-wrong-results
     */
    // const y = rect.top - rect.height;
    // const y = nodeEl.style.top;
    const x = 0 - getElLeftOffset(nodeEl);
    // const y = 0 - getElTopOffset(nodeEl) - NodeMenuYOffset;
    const y = 0 - NodeMenuHeight;
    const w = rect.width;
    const h = NodeMenuHeight;
    // <div class="node-overlay">
    const nodeBtns = this.makeNodeButtons(node);
    const hoverEl = this.currentHoverEl = compileHtmlElement(/*html*/`
      <div class="node-overlay" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px;"></div>
    `);
    hoverEl.appendChild(nodeBtns);
    // NOTE: mouseover + mouseout are not very reliable events for this
    // this.currentHoverEl.addEventListener('mouseout', () => {
    //   this._removeNodePopup();
    // });
    let moveTimer;
    document.addEventListener('mousemove', documentMouseMoveHandler = (e) => {
      // debounce
      if (moveTimer) { return; }
      moveTimer = setTimeout(() => {
        // const el = document.elementFromPoint(e.clientX, e.clientY); // NOTE: this does NOT return the top element
        moveTimer = null;
        /**
         * @see https://stackoverflow.com/a/15263171
         */
        const hoverStack = Array.from(document.querySelectorAll(":hover"));
        if (!hoverStack.includes(nodeEl) && !hoverStack.includes(hoverEl)) {
          this._removeNodePopup(hoverEl);
        }
      }, 80);
    });

    // this.el.appendChild(this.currentHoverEl);
    nodeEl.appendChild(hoverEl);
  }

  /** ###########################################################################
   * buildGraph
   * ##########################################################################*/

  /**
   * @type {RenderState}
   */
  get renderState() {
    return this.context.doc.state;
  }

  get root() {
    return this.renderState.timelineNodes?.[RootTimelineId];
  }

  /**
   * @param {DDGTimelineNode} node 
   */
  isGroupNode(node) {
    return isControlGroupTimelineNode(node.type) && !ddgQueries.isCollapsed(this.renderState, node);
  }

  buildGraph() {
    const { root } = this;
    const {
      // summaryModes,
      edges
      // outEdgesByTimelineId,
      // inEdgesByTimelineId
    } = this.renderState;

    if (!root) {
      return;
    }

    this.addTreeNodes(root);

    if (edges) {
      // add default edges
      for (const edge of edges) {
        if (edge) {
          this.addEdge(edge);
        }
      }
    }
  }

  /**
   * @param {DDGTimelineNode} node 
   * @param {*} depth 
   * @param {*} top 
   */
  addTreeNodes(node, depth = 0, top = YPadding) {
    const allNodes = this.renderState.timelineNodes;
    const { type, children, label = '' } = node;
    let bottom = top + YGroupPadding;
    let left = XPadding + Math.floor(Math.random() * 400);
    let right;

    if (!ddgQueries.isVisible(this.renderState, node)) {
      return false;
    }

    const isSummarized = ddgQueries.isNodeSummarized(this.renderState, node);
    const isGroupNode = this.isGroupNode(node);
    const el = this.makeNodeEl(node, label);
    this.el.appendChild(el);

    if (isSummarized) {
      // hackfix: summary (TODO: make sure, in the new version, we don't have repeating loops like this)
      // → here, we treat the original node (`el`) as a group node
      // → in the new version, we probably want to explicitly add a `subgraph` (and put this logic in a dedicated function)
      const summary = this.renderState.nodeSummaries[node.timelineId];
      if (summary) {
        const { summaryRoots } = summary;
        for (const summaryNodeId of summaryRoots) {
          const summaryNode = allNodes[summaryNodeId];
          this.addTreeNodes(summaryNode, depth + 1, bottom);
        }
      }
      else {
        this.el.style.backgroundColor = 'red';
        this.el.textContent = `(missing summary)`;
      }
    }
    else if (isGroupNode) {
      // TODO: change to `dot` → `subgraph`
      if (children?.length) {
        for (const childId of Object.values(children)) {
          const childNode = allNodes[childId];

          // TODO: move this logic to applySummarization
          if (this.context.doc.state.connectedOnlyMode &&
            !isControlGroupTimelineNode(childNode.type) &&
            !childNode.connected
          ) {
            continue;
          }
          if (this.addTreeNodes(childNode, depth + 1, bottom)) {
            const { displayData: childDisplayData } = childNode;
            bottom = childDisplayData.bottom + YGroupPadding;
          }
        }
      }
      bottom += YGroupPadding;
      left = depth * 3;
      right = depth * 3;
    }
    else if (type === DDGTimelineNodeType.RefSnapshot) {
      if (children?.length) {
        for (const propName of Object.keys(children)) {
          const childId = children[propName];
          const childNode = allNodes[childId];
          const childEl = this.makeNodeEl(childNode, propName);
          el.appendChild(childEl);
        }
      }
      bottom = top + el.offsetHeight;
    }
    else {
      bottom = top + el.offsetHeight;
    }

    node.displayData = {
      top,
      bottom,
      left,
      right,
      isGroupNode,
    };

    this.repositionNodeEl(el, node.displayData);

    return true;
  }

  /** ###########################################################################
   * jsPlumb implementation
   *  #########################################################################*/

  initGraphImplementation() {
    this.nodeElMap = new Map();
    this.jsPlumb = jsPlumbBrowserUI.newInstance({
      container: this.el
    });
  }

  rebuildGraph() {
    this.jsPlumb.batch(() => {
      this.clearGraph();
      this.buildGraph();
    });
  }

  makeNodeDebugOverlay(node) {
    const content = `Node = ${JSON.stringify(node, null, 2)}`;
    return compileHtmlElement(/*html*/`<pre class="node-debug-overlay">${content}</pre>`);
  }

  makeNodeEl(node, label) {
    const { type, timelineId } = node;
    let el;
    const isGroup = this.isGroupNode(node);
    if (isGroup) {
      el = compileHtmlElement(/*html*/`<div class="timeline-group">${label}</div>`);
    }
    else if (type === DDGTimelineNodeType.RefSnapshot) {
      el = compileHtmlElement(/*html*/`<div class="timeline-ref-node"><div class="timeline-node">${label}</div></div>`);
    }
    else {
      el = compileHtmlElement(/*html*/`<div class="timeline-node">${label}</div>`);
    }

    if (isDataTimelineNode(type)) {
      // add overlays
      let debugOverlay;
      el.addEventListener('mouseover', () => {
        if (!debugOverlay) {
          // create overlay lazily
          el.appendChild(debugOverlay = this.makeNodeDebugOverlay(node));
        }
        this.maybeShowNodePopupEl(node, el);
      });
    }

    // addNode
    el.dataset.timelineId = timelineId;
    this.addNode(timelineId, el, node);
    // this.logger.log(`[addNode]`, parent, parent.displayData);
    return el;
  }

  addNode(key, el, node) {
    const isGroupNode = this.isGroupNode(node);

    // else {
    //   if (!connected && this.context.doc.state.connectedOnlyMode) {
    //     el.classList.add('hidden');
    //   }
    // }

    this.nodeElMap.set(key, el);
    // this.el.appendChild(el);
    if (!isGroupNode) {
      this.jsPlumb.manage(el);
    }
  }

  repositionNodeEl(el, displayData) {
    const { left, right, top, bottom, isGroupNode } = displayData;
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    if (isGroupNode) {
      el.style.height = `${bottom - top}px`;
      el.style.right = `${right}px`;
    }
  }

  addEdge(edge) {
    // const fromTimelineId = this.renderState.timelineNodes[edge.from];
    // const toTimelineId = this.renderState.timelineNodes[edge.to];
    const fromTimelineId = edge.from;
    const toTimelineId = edge.to;
    const source = this.nodeElMap.get(fromTimelineId);
    const target = this.nodeElMap.get(toTimelineId);
    this.jsPlumb.connect({
      source,
      target,
      /**
       * @see https://docs.jsplumbtoolkit.com/community/lib/connectivity#detaching-connections
       */
      detachable: false,
      /**
       * @see https://docs.jsplumbtoolkit.com/community/lib/endpoints#endpoint-types
       */
      endpoints: ['Blank', 'Blank'],
      connector: {
        /**
         * @see https://docs.jsplumbtoolkit.com/community/lib/connectors#bezier-connector
         * @see https://docs.jsplumbtoolkit.com/community/apidocs/connector-bezier
         */
        type: BezierConnector.type,
        /**
         * hackfix: always provide `options`, or it will bug out.
         * @see https://github.com/jsplumb/jsplumb/issues/1129
         */
        options: {
          /**
           * default = 150
           */
          curviness: 20
        }
      },
      overlays: [
        {
          type: 'PlainArrow',
          options: {
            location: 1,
            width: 4,
            length: 4,
          }
        },
      ],
      anchor: AnchorLocations.AutoDefault
    });
  }

  clearGraph() {
    this.jsPlumb.deleteEveryConnection();
    this.el.querySelectorAll('div.timeline-node').forEach(el => el.remove());
    this.el.querySelectorAll('div.timeline-group').forEach(el => el.remove());
    // for (const el of this.nodeElMap.values()) {
    //   this.el.removeChild(el);
    // }
    this.nodeElMap = new Map();
  }

  /** ###########################################################################
   * timeline controls
   *  #########################################################################*/

  async setSummaryMode(timelineId, mode) {
    await this.remote.setSummaryMode(timelineId, mode);
  }

  /** ###########################################################################
   * misc
   * ##########################################################################*/

  public = {
    async updateAfterSummary(data) {
    }
  };
}


/** ###########################################################################
 * util
 *  #########################################################################*/

// function rescalePositions(positions) {
//   if (!positions || !Object.keys(positions).length) {
//     return positions;
//   }

//   const minX = minBy(Object.values(positions), (p) => p.x).x;
//   const maxX = maxBy(Object.values(positions), (p) => p.x).x;
//   const minY = minBy(Object.values(positions), (p) => p.y).y;
//   const maxY = maxBy(Object.values(positions), (p) => p.y).y;
//   const deltaX = maxX - minX;
//   const deltaY = maxY - minY;
//   for (const ddgNodeId of Object.keys(positions)) {
//     positions[ddgNodeId].x /= deltaX;
//     positions[ddgNodeId].y /= deltaY;
//   }
//   return positions;
// }


/** ###########################################################################
 * old code
 * ##########################################################################*/

// Tree version
// addTreeNodes(root, nodes, leftBound = XPadding, topBound = YPadding) {
//   const subtreeLeft = leftBound;
//   const top = topBound;
//   let subtreeRight, subtreeBottom = top;

//   const el = this.makeNodeEl(root);
//   this.el.appendChild(el);
//   const width = el.offsetWidth;
//   const height = el.offsetHeight;

//   if (root.children?.length) {
//     let childLeft = leftBound;
//     const childTop = top + height + YGap;
//     // debugger;
//     for (const childId of root.children) {
//       const childNode = nodes[childId];
//       const { displayData: childDisplayData } = this.addTreeNodes(childNode, nodes, childLeft, childTop);
//       childLeft = childDisplayData.subtreeRight + XGap;
//       subtreeBottom = Math.max(subtreeBottom, childDisplayData.subtreeBottom);
//     }
//     subtreeRight = childLeft - XGap;
//   }
//   else {
//     subtreeRight = subtreeLeft + width;
//     subtreeBottom = top + height;
//   }

//   const left = (subtreeLeft + subtreeRight - width) / 2;

//   root.displayData = {
//     left,
//     top,
//     subtreeLeft,
//     subtreeRight,
//     subtreeBottom,
//   };

//   this.addNode(root.timelineId, el, root.displayData);

//   return root;
// }

/** ###########################################################################
 * Sigma.js implementation
 *  #########################################################################*/

// import minBy from 'lodash/minBy';
// import maxBy from 'lodash/maxBy';
// import Graph from 'graphology';
// import forceLayout from 'graphology-layout-force';
// import forceAtlas2 from 'graphology-layout-forceatlas2';
// import { Sigma } from 'sigma';
// import { animateNodes } from 'sigma/utils/animate';
// import LayoutAlgorithmType from '@dbux/graph-common/src/ddg/types/LayoutAlgorithmType';
/**
 * Default render settings for Sigma.js
 * @see https://github.com/jacomyal/sigma.js/blob/main/src/settings.ts#L84
 */
// const renderSettings = {
//   labelColor: { color: '#fff' },
//   labelSize,
//   edgeLabelSize: labelSize,
//   labelRenderedSizeThreshold: 0.1 // default = 6
// };

// const topNodeKey = 'top';
// const bottomNodeKey = 'bottom';

/** ########################################
 * abstract functions implementation
 *  ######################################*/

// initGraphImplementation() {
//   this.graph = new Graph();
//   // this.graph.
//   this.renderer = new Sigma(this.graph, this.el, renderSettings);
//   // test
//   // document.addEventListener('click', this.applyLayout.bind(this));
// }

// rebuildGraph() {
//   this.clearGraph();
//   this.buildGraph();
// }

// addNode(node) {
//   const label = node.label || `Node#${node.ddgNodeId}`;
//   const pos = this.getNodeInitialPosition(node);
//   const { x, y } = pos;
//   /**
//    * @type {NodeDisplayData}
//    */
//   const nodeDisplayData = {
//     x,
//     y,
//     label,

//     size: 5,
//     color: "blue"
//   };
//   return this.addNodeLayout(node.ddgNodeId, nodeDisplayData);
// }

// addSpecialNodes() {
//   // add special nodes at the top and bottom
//   this.addNodeLayout(topNodeKey, {
//     x: 0,
//     y: this.getNodeYTop(),
//     fixed: true,

//     // hidden: true
//     label: 'top',
//     size: 5,
//     color: "green"
//   });
//   this.addNodeLayout(bottomNodeKey, {
//     x: 0,
//     y: this.getNodeYBottom(),
//     fixed: true,

//     // hidden: true
//     label: 'bottom',
//     size: 5,
//     color: "red"
//   });
// }

// addEdge(edge) {
//   /**
//    * `code ./node_modules/graphology/dist/graphology.esm.js:3691`
//    */
//   this.graph.addEdge(edge.from, edge.to);
// }

// /**
//  * Insert a raw node into the graph (for layouting + rendering purposes)
//  * @param {{ x: number, y: number, fixed, hidden, size, color }} nodeDisplayData
//  */
// addNodeLayout(key, nodeDisplayData) {
//   return this.graph.addNode(key, nodeDisplayData);
// }

// /**
//  * @return {NodeDisplayData}
//  */
// getNodeDisplayData(nodeKey) {
//   // see graphology → `findRelevantNodeData` (via `attachNodeAttributesMethods`)
//   return this.graph.getNodeAttribute(nodeKey/* , 'defaultPosition' */);
// }

// clearGraph() {
//   this.graph.clear();
// }

/** ########################################
 * auto layout
 *  ######################################*/

// applyForceLayout() {
//   // set initial state using FA2
//   this.applyFA2();

//   // run standard force-directed algorithm here
//   const layoutSettings = {
//     maxIterations: 500,
//     /**
//      * @see https://graphology.github.io/standard-library/layout-force.html
//      */
//     settings: {
//       gravity: 0.01, // NOTE: if gravity is too large, nodes will move beyond top and bottom
//       repulsion: 0.1,
//       attraction: 0.001
//     }
//   };
//   // this.logger.log('layoutSettings', layoutSettings);
//   const positions = forceLayout(this.graph, layoutSettings);
//   // const rescaledPositions = rescalePositions(positions);
//   this.logger.log('[force layout] positions', positions);
//   animateNodes(this.graph, positions, { duration: AutoLayoutAnimationDuration });
// }

// applyFA2() {
//   const sensibleSettings = forceAtlas2.inferSettings(this.graph);
//   sensibleSettings.gravity = 1;
//   sensibleSettings.strongGravityMode = false;
//   this.logger.log('[FA2] sensibleSettings', sensibleSettings);
//   // const positions = forceAtlas2(this.graph, {
//   forceAtlas2.assign(this.graph, {
//     iterations: 200,
//     settings: sensibleSettings
//   });

//   // // overwrite with our default `y`
//   // for (const nodeId of Object.keys(positions)) {
//   //   // see graphology → `findRelevantNodeData`
//   //   const { y } = this.graph.getNodeAttribute(nodeId, 'defaultPosition');
//   //   positions[nodeId].y = y;
//   // }

//   // const rescaledPositions = rescalePositions(positions);
//   // this.logger.log('positions', rescaledPositions);

//   // animateNodes(this.graph, positions, { duration: AutoLayoutAnimationDuration });
// }

// autoLayout = () => {
//   const { layoutType } = this.context.doc.state;
//   if (layoutType === LayoutAlgorithmType.ForceLayout) {
//     this.applyForceLayout();
//   }
//   else if (layoutType === LayoutAlgorithmType.ForceAtlas2) {
//     this.applyFA2();
//   }
//   else {
//     this.logger.error(`Unkown layout algorithm type: ${layoutType}`);
//   }
// }


/** ###########################################################################
 * layout computation
 * ##########################################################################*/

// getNodeYTop() {
//   // return YPadding + (this.renderState.timelineNodes.length + 1) * GraphScale;
//   return YPadding + 0;
// }

// getNodeYBottom() {
//   // return YPadding - this.renderState.timelineNodes.length * GraphScale;
//   return YPadding + (this.renderState.timelineNodes.length + 1) * GraphScale;
// }

// getNodeInitialPosition(node) {
//   /**
//    * WARNING: auto layout using `ForceAtlas` algorithm fails if all nodes starts with `x=0 and y=0`
//    * @see https://graphology.github.io/standard-library/layout-forceatlas2.html#pre-requisites
//    */
//   // const x = node.ddgNodeId / this.renderState.timelineNodes.length;
//   const x = XPadding + Math.random() * this.renderState.timelineNodes.length * GraphScale;

//   /**
//    * WARNING: if you change this, also change getNodeY{Top,Bottom}
//    */
//   // const y = YPadding + ((-1 * node.ddgNodeId + this.renderState.timelineNodes.length) || 0) * GraphScale;
//   const y = YPadding + (node.ddgNodeId + 1 || 0) * GraphScale;
//   return { x, y };
// }