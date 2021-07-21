import { compileHtmlElement } from '../../util/domUtil';
import ClientComponentEndpoint from '../../componentLib/ClientComponentEndpoint';

class AsyncGraph extends ClientComponentEndpoint {
  createEl() {
    return compileHtmlElement(/*html*/`
      <div class="graph-root">
        <h4>Applications:</h4>
        <pre data-el="applications"></pre>
        <div data-el="nodeChildren" data-mount="ThreadColumn" class="node-children flex-row align-start">
          <div class="display-only-child">(no async event recorded)</div>
        </div>
      </div>
    `);
  }

  get popperManager() {
    return this.controllers.getComponent('PopperManager');
  }

  update() {
    const { asyncGraphMode } = this.context.graphDocument.state;
    if (!asyncGraphMode) {
      this.el.classList.add('hidden');
    }
    else {
      this.el.classList.remove('hidden');
      const { applications } = this.state;
      if (applications?.length) {
        this.els.applications.textContent = ` ${applications.map(app => app.name).join('\n ')}`;
      }
      else {
        this.els.applications.textContent = '(no applications selected)';
      }
    }
  }
}
export default AsyncGraph;