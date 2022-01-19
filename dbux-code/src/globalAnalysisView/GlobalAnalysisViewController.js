import { newLogger } from '@dbux/common/src/log/logger';
import allApplications from '@dbux/data/src/applications/allApplications';
import traceSelection from '@dbux/data/src/traceSelection';
import ErrorTraceManager from './ErrorTraceManager';
import GlobalAnalysisNodeProvider from './GlobalAnalysisNodeProvider';
import GlobalErrorsNode from './nodes/GlobalErrorsNode';

/** @typedef {import('vscode').ExtensionContext} ExtensionContext */

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('GlobalAnalysisViewController');

let controller;

export default class GlobalAnalysisViewController {
  constructor() {
    this.treeDataProvider = new GlobalAnalysisNodeProvider();
    this.treeDataProvider.controller = this;
    this.errorTraceManager = new ErrorTraceManager();
  }

  get treeView() {
    return this.treeDataProvider.treeView;
  }

  refresh = () => {
    this.treeDataProvider.decorateTitle(`(${allApplications.selection.getAll().length})`);
    return this.treeDataProvider.refresh();
  }

  refreshOnData = () => {
    this.errorTraceManager.refresh();

    this.refresh();
  }

  /** ###########################################################################
   * error
   *  #########################################################################*/

  async showError() {
    if (!this.children) {
      const errorNode = this.treeDataProvider.getNodeByClass(GlobalErrorsNode);
      await this.treeView.reveal(errorNode, { select: false, expand: true });
    }
    this.errorTraceManager.showError();
    const errorNode = this.treeDataProvider.getNodeByClass(GlobalErrorsNode);
    const selectedErrorNode = errorNode.getSelectedChildren();
    if (selectedErrorNode) {
      await this.treeView.reveal(selectedErrorNode);
    }
    else {
      logError(`Cannot find selected children after showError`);
    }
  }

  /** ###########################################################################
   * init
   *  #########################################################################*/

  initOnActivate(context) {
    // click event listener
    this.treeDataProvider.initDefaultClickCommand(context);

    // application selection changed
    allApplications.selection.onApplicationsChanged((selectedApps) => {
      this.refreshOnData();
      for (const app of selectedApps) {
        allApplications.selection.subscribe(
          app.dataProvider.onData('traces', this.refreshOnData),
          // app.dataProvider.onData('staticProgramContexts', this.refreshOnData)
        );
      }
    });

    traceSelection.onTraceSelectionChanged(() => this.treeDataProvider.refreshIcon());
  }
}

// ###########################################################################
// init
// ###########################################################################

/**
 * @param {ExtensionContext} context 
 */
export function initGlobalAnalysisView(context) {
  controller = new GlobalAnalysisViewController(context);
  controller.initOnActivate(context);

  // refresh right away
  controller.refresh();

  return controller;
}