import { compileHtmlElement } from '../util/domUtil';
import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';

class GraphRoot extends ClientComponentEndpoint {
  createEl() {
    return compileHtmlElement(/*html*/`
      <div class="graph-root">
        <div data-el="graphCont" class="graph-cont">
          <div data-el="body" class="body flex-column">
            <h4>Applications:</h4>
            <pre data-el="applications"></pre>
            <div>
              <button data-el="previousModeButton" class="root-graph-mode-button">
                <img data-el="previousModeButtonImg">
              </button>
              <button data-el="nextModeButton" class="root-graph-mode-button">
                <img data-el="nextModeButtonImg">
              </button>
            </div>
            <div data-mount="HiddenBeforeNode"></div>
            <div data-el="nodeChildren" data-mount="RunNode" class="node-children flex-column">
              <div class="before-run-node"></div>
            </div>
            <div data-mount="HiddenAfterNode"></div>
          </div>
        </div>
      </div>
    `);
  }

  update() {
    const { asyncGraphMode } = this.context.graphDocument.state;
    const { preferAsyncMode } = this.state;
    if (preferAsyncMode === asyncGraphMode) {
      this.el.classList.remove('hidden');
      const { applications } = this.state;
      if (applications?.length) {
        this.els.applications.textContent = ` ${applications.map(app => app.name).join('\n ')}`;
      }
      else {
        this.els.applications.textContent = '(no applications selected)';
      }
    }
    else {
      this.el.classList.add('hidden');
    }
  }
}
export default GraphRoot;