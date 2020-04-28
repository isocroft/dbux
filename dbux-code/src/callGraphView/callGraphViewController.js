import { ExtensionContext, commands, window } from 'vscode';
import { newLogger } from 'dbux-common/src/log/logger';
import allApplications from 'dbux-data/src/applications/allApplications';
import { makeDebounce } from 'dbux-common/src/util/scheduling';
import CallGraphNodeProvider from './CallGraphNodeProvider';

const { log, debug, warn, error: logError } = newLogger('callGraphViewController');

let controller;

export class CallGraphViewController {
  constructor() {
    this.treeDataProvider = new CallGraphNodeProvider(this);
    this.treeView = this.treeDataProvider.treeView;
    this._filterString = '';
    this._mode = 'context';
  }

  refresh = () => {
    this.treeDataProvider.refresh();
  }

  refreshOnData = makeDebounce(() => {
    this.refresh();
  });

  refreshIcon = () => {
    let hasError = false;
    for (const app of allApplications.selection.getAll()) {
      if (app.dataProvider.util.getAllErrorTraces().length) {
        hasError = true;
        break;
      }
    }
    commands.executeCommand('setContext', 'dbuxCallGraphView.context.mode', 'context');
    commands.executeCommand('setContext', 'dbuxCallGraphView.context.hasError', hasError);
  }

  initOnActivate(context) {
    commands.executeCommand('setContext', 'dbuxCallGraphView.context.filtering', false);
    commands.executeCommand('setContext', 'dbuxCallGraphView.context.hasError', false);
    commands.executeCommand('setContext', 'dbuxCallGraphView.context.mode', 'context');

    // ########################################
    // hook up event handlers
    // ########################################

    // click event listener
    this.treeDataProvider.initDefaultClickCommand(context);

    // data changed
    allApplications.selection.onApplicationsChanged((selectedApps) => {
      for (const app of selectedApps) {
        allApplications.selection.subscribe(
          app.dataProvider.onData('executionContexts', this.refreshOnData),
          app.dataProvider.onData('traces', this.refreshIcon)
        );
      }
    });
  }

  // ########################################
  //  Mode functions (showContext/showError)
  // ########################################

  getMode() {
    return this._mode;
  }

  showContext() {
    this._setMode('context');
  }

  showError() {
    this._setMode('error');
  }

  _setMode(mode) {
    if (this._mode !== mode) {
      this._mode = mode;
      this.refreshIcon();
      this.clearFilter();
      this.refresh();
    }
  }

  // ########################################
  //  Filter functions
  // ########################################

  getFilterString() {
    return this._filterString;
  }

  isFiltering() {
    return !!this._filterString;
  }

  setFilter = () => {
    window.showInputBox({
      ignoreFocusOut: true,
      placeHolder: 'keyword to filter e.g. \'[cb]\'',
      value: this._filterString
    }).then((filterString) => {
      if (filterString !== undefined) {
        this._setFilter(filterString);
      }
    });
  }

  clearFilter = () => {
    this._setFilter('');
  }

  _setFilter = (str) => {
    this._filterString = str;
    commands.executeCommand('setContext', 'dbuxCallGraphView.context.filtering', this.isFiltering());
    this.refresh();
    if (this.isFiltering()) {
      for (let node of this.treeDataProvider.rootNodes) {
        const expand = !!node.collapsibleState;
        this.treeView.reveal(node, { expand, select: false });
      }
    }
  }
}

// ###########################################################################
// init
// ###########################################################################

export function initCallGraphView(context: ExtensionContext) {
  controller = new CallGraphViewController();
  controller.initOnActivate(context);

  // refresh right away
  controller.refresh();

  return controller;
}