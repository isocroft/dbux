import { compileHtmlElement } from '../../util/domUtil';
import SyncGraphBase from '../SyncGraphBase';

/** @typedef {import('../controllers/PopperManager').default} PopperManager */

class AsyncStack extends SyncGraphBase {
  createEl() {
    return compileHtmlElement(/*html*/`
      <div class="graph-root">
        <div class="async-header">
          <h4>Async Stack:</h4>
          <div>
            <button data-el="previousModeButton" class="root-graph-mode-button">
              <img data-el="previousModeButtonImg">
            </button>
            <button data-el="nextModeButton" class="root-graph-mode-button">
              <img data-el="nextModeButtonImg">
            </button>
          </div>
        </div>
        <div data-el="nodeChildren" data-mount="RunNode" class="node-children flex-column">
          <div class="before-run-node"></div>
        </div>
      </div>
    `);
  }

  setupEl() {
    // set graph fixed position
    this.parent.el.classList.add('async-stack');
  }
}
export default AsyncStack;