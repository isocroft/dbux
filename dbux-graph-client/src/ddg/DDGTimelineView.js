import * as jsPlumbBrowserUI from '@jsplumb/browser-ui';
import { AnchorLocations } from '@jsplumb/common';
import { BezierConnector } from "@jsplumb/connector-bezier";
import { compileHtmlElement } from '../util/domUtil';
import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';

export default class DDGTimelineView extends ClientComponentEndpoint {
  createEl() {
    return compileHtmlElement(/*html*/`<div>
      <div data-el="status"></div>
      <div class="timeline-view"></div>
    </div>`);
  }

  setupEl() {
    this.nodeElMap = new Map();
    this.jsPlumb = jsPlumbBrowserUI.newInstance({
      container: this.el
    });
  }

  update() {
    // update status message
    if (this.state.failureReason) {
      this.els.status.className = 'alert alert-danger';
      this.els.status.textContent = 'Cannot build DataDependencyGraph: ' + this.state.failureReason;
    }
    else {
      this.els.status.textContent = '';
    }

    // TODO: don't re-create jsplumb every time
    if (this.jsPlumb) {
      this.jsPlumb.batch(() => {
        this.clearGraph();
      });
    }

    // rebuild graph

    this.jsPlumb.batch(() => {
      this.clearGraph();
      this.buildGraph();
    });
  }

  buildGraph() {
    const { nodes, edges } = this.state;

    if (!nodes) {
      return;
    }

    // build nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const el = compileHtmlElement(/*html*/`<div class="timeline-node">
        ${node.label || `Node#${node.entityId}`}
      </div>`);
      el.style.left = '200px';
      el.style.top = `${30 * i}px`;
      this.nodeElMap.set(node.entityId, el);
      this.el.appendChild(el);
      // instance.addEndpoint(el, { endpoint: DotEndpoint.type });
      this.jsPlumb.manage(el);
    }

    if (edges) {
      // add edges
      // console.log('BezierConnector.type', BezierConnector.type);
      for (const edge of edges) {
        const source = this.nodeElMap.get(edge.from);
        const target = this.nodeElMap.get(edge.to);
        this.jsPlumb.connect({
          source,
          target,
          /**
           * @see https://docs.jsplumbtoolkit.com/community/lib/connectivity#detaching-connections
           */
          detachable: false,
          connector: {
            /**
             * @see https://docs.jsplumbtoolkit.com/community/apidocs/connector-bezier
             */
            type: BezierConnector.type,
            /**
             * hackfix: always provide `options`, or it will bug out.
             * @see https://github.com/jsplumb/jsplumb/issues/1129
             */
            options: {
              // curviness: 50
            }
          },
          anchor: AnchorLocations.AutoDefault
        });
      }
    }
  }

  clearGraph() {
    for (const node of this.nodeElMap.values()) {
      this.jsPlumb.remove(node);
    }
    this.nodeElMap = new Map();
  }
}