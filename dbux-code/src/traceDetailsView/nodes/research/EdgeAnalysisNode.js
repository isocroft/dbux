import sleep from '@dbux/common/src/util/sleep';
import { pathResolve } from '@dbux/common-node/src/util/pathUtil';
import AsyncEdgeType from '@dbux/common/src/types/constants/AsyncEdgeType';
import Enum from '@dbux/common/src/util/Enum';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import traceSelection from '@dbux/data/src/traceSelection';
import { newLogger } from '@dbux/common/src/log/logger';
import { sha256String } from '@dbux/common-node/src/util/hashUtil';
import { TreeItemCollapsibleState, window } from 'vscode';
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'fs';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import Application from '@dbux/data/src/applications/Application';
import TraceDetailNode from '../traceDetailNode';
import { makeTreeItem } from '../../../helpers/treeViewHelpers';
// eslint-disable-next-line max-len
import { getCurrentResearch, getDataFolderLink } from '../../../research/Research';
import { confirm, showErrorMessage, showInformationMessage, showWarningMessage } from '../../../codeUtil/codeModals';
import { runTaskWithProgressBar } from '../../../codeUtil/runTaskWithProgressBar';


// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('EdgeAnalysis');

/** @typedef {import('@dbux/common/src/types/Trace').default} Trace */

/** ###########################################################################
 * config
 * ##########################################################################*/

const EdgeDataFileName = 'edgeAnnotations.json';

/** ###########################################################################
 * EdgeStatus
 * ##########################################################################*/

const edgeStatusObj = {
  Good: 1,

  /** ########################################
   * false forks
   * #######################################*/

  PromiseNotNested: 2,
  CBPromisified: 3,
  CB: 4,

  /** ########################################
   * other inaccuracies
   * #######################################*/

  /**
   * Chained, but skipped one or more in chain, usually resulting in unwanted multi chain
   * that should be a single chain.
   */
  Skipped: 11
};

/**
 * @type {Enum | typeof edgeStatusObj}
 */
const EdgeStatus = new Enum(edgeStatusObj);

/** ###########################################################################
 * utilities
 * ##########################################################################*/

function selectedModalBtn(selected, text) {
  return selected ? `(${text})` : `${text}`;
}

/** ###########################################################################
 * {@link EdgeAnnotationData}
 * ##########################################################################*/

export class EdgeAnnotationData {
  /**
   * `toRoot` of the edge uniquely identifies it.
   */
  rootId;

  /**
   * @type {EdgeStatus}
   */
  status;

  comment;
}

class AppMeta {
  appDataHash;
  appDataUuid;
  updatedAt;
}

class EdgeDataFile {
  /**
   * @type {AppMeta}
   */
  appMeta;

  /**
   * @type {Object.<string, EdgeAnnotationData>}
   */
  annotations;
}

/** ###########################################################################
 * {@link EdgeAnalysisController}
 * ##########################################################################*/

/**
 * Manage annotations of all edges. Store them to a JSON file.
 */
class EdgeAnalysisController {
  /**
   * @type {EdgeDataFile}
   */
  _data = null;

  _lastAppUuid;

  /**
   * Used for synchronization
   */
  _applicationUpdateVersion = 0;

  /**
   * @type {TraceDetailNode}
   */
  node;

  research;

  constructor(node) {
    this.node = node;
    this.research = getCurrentResearch();
  }

  /** ###########################################################################
   * getters
   * ##########################################################################*/

  get treeNodeProvider() {
    return this.node.treeNodeProvider;
  }

  get app() {
    return this.node.app;
  }

  get trace() {
    return this.node.trace;
  }

  get dp() {
    return this.node.dp;
  }


  get currentEdgeRootId() {
    return this.trace.rootContextId;
  }

  get currentEdge() {
    const rootId = this.currentEdgeRootId;
    return rootId && this.getEdge(rootId) || null;
  }

  get dataFolder() {
    return this.research.getResearchDataRoot();
  }

  get hasProjectAppData() {
    return !!this.experimentId && !!this.dataFolder;
  }

  get projectName() {
    return this.app?.projectName || null;
  }

  get experimentId() {
    return this.app?.experimentId || null;
  }

  /** ###########################################################################
   * annotations
   * ##########################################################################*/

  makeEdgeDescription(rootId) {
    const annotation = this.getEdgeAnnotation(rootId);
    const { status, comment } = annotation || EmptyObject;
    const { edgeType } = this.getEdge(rootId) || EmptyObject;

    const edgeTypeLabel = edgeType && AsyncEdgeType.nameFrom(edgeType);
    const indicator = annotation ? '✔️' : '◯';
    const annoLabel = annotation &&
      `: ${EdgeStatus.nameFrom(status) || ''} ${comment || ''}` ||
      '';

    return `${indicator} [${edgeTypeLabel}] ${rootId}${annoLabel}`;
  }

  getAllEdgesSorted() {
    const { dp } = this;
    let edges = dp.collections.asyncEvents.getAllActual();

    // copy before sort - see: https://stackoverflow.com/a/9592755
    edges = Array.prototype.slice.call(edges || EmptyArray);

    return edges.sort((a, b) => {
      const aRoot = a.toRootContextId;
      const bRoot = b.toRootContextId;
      const aAnno = this.getEdgeAnnotation(aRoot);
      const bAnno = this.getEdgeAnnotation(bRoot);

      // 1. not annotated before annotated
      if (!!aAnno !== !!bAnno) {
        return !!aAnno - !!bAnno;
      }

      // 2. FORKs before CHAINs
      if (a.edgeType !== b.edgeType) {
        return b.edgeType - a.edgeType;
      }

      // 3. sort by order of occurrence
      return aRoot - bRoot;
    });
  }

  /**
   * @return {EdgeAnnotationData}
   */
  getEdgeAnnotation(rootId) {
    return this.getAllAnnotations()?.[rootId];
  }

  getEdge(rootId) {
    return this.dp.indexes.asyncEvents.to.getUnique(rootId);
  }

  setEdgeAnnotation(rootId, annotation) {
    if (!this.hasProjectAppData) {
      // can't do anything right now
      throw new Error(`cannot setEdgeAnnotation if !hasData`);
    }

    const annotations = this.getAllAnnotations() || {};
    annotations[rootId] = merge(annotations[rootId] || {}, annotation);
    this.writeAnnotationsToFile(annotations);
  }

  /** ###########################################################################
   * serialization
   * ##########################################################################*/

  getEdgeDataFilePath() {
    const { experimentId } = this;
    if (!experimentId) {
      return null;
    }
    const root = this.research.getExperimentFolder(experimentId);
    return pathResolve(root, EdgeDataFileName);
  }

  getAppMeta() {
    const data = this.getOrReadDataFile();
    return data?.appMeta;
  }

  /**
   * @return {Object.<string, EdgeAnnotationData>}
   */
  getAllAnnotations() {
    const data = this.getOrReadDataFile();
    return data?.annotations;
  }

  /**
   * @param {Object.<string, EdgeAnnotationData>} annotations
   */
  writeAnnotationsToFile(annotations) {
    if (!this._data) {
      this._data = {};
    }
    this._data.annotations = annotations;
    this.writeDataFile(this._data);
  }

  writeAppMeta(appMeta) {
    if (!this._data) {
      this._data = {};
    }
    this._data.appMeta = appMeta;
    this.writeDataFile(this._data);
  }

  getAllFolders() {
    return [this.research.getExperimentFolder(this.experimentId), this.research.getDataRootLfs()];
  }

  /**
   * @return {EdgeDataFile}
   */
  getOrReadDataFile() {
    if (this._data) {
      return this._data;
    }

    const fpath = this.getEdgeDataFilePath();
    if (!fpath) { return null; }

    if (!existsSync(fpath)) {
      // create empty file, and make sure, directories are present
      this.getAllFolders().forEach(f => mkdirSync(f, { recursive: true }));
      this.writeDataFile({});
    }

    const serialized = readFileSync(fpath, 'utf8');
    return this._data = serialized && JSON.parse(serialized) || {};
  }

  /**
   * @param {EdgeDataFile} data 
   */
  writeDataFile(data) {
    const fpath = this.getEdgeDataFilePath();
    if (!fpath) { throw new Error(`cannot write before data is ready`); }

    const serialized = JSON.stringify(data);
    return writeFileSync(fpath, serialized, 'utf8');
  }

  /** ###########################################################################
   * application events
   * NOTE: we don't need most of this, 
   * since its already taken care of by the {@link TraceDetailsNodeProvider}
   * ##########################################################################*/

  refresh = () => {
    //   this.treeNodeProvider.refresh();
  }

  // refreshOnData = makeDebounce(() => {
  //   this.refresh();
  // }, 100);

  initOnExpand() {
    // reset + lookup data root folder again
    this._data = null;

    if (this._lastAppUuid !== this.app.uuid) {
      this._lastAppUuid = this.app.uuid;

      this.handleApplicationChanged();
    }


    // // add data event handlers
    // this.addDisposable(
    //   allApplications.selection.onApplicationsChanged((selectedApps) => {
    //     this.refreshOnData();
    //     for (const app of selectedApps) {
    //       const unsub = app.dataProvider.onData('asyncEdges', this.onApplicationChanged);

    //       allApplications.selection.subscribe(unsub);
    //       this.addDisposable(unsub);
    //     }
    //   }),

    //   // // add traceSelection event handler
    //   // traceSelection.onTraceSelectionChanged((/* selected */) => {
    //   //   this.refreshOnData();
    //   // })
    // );
    // this.refresh();
  }

  /** ###########################################################################
   * application data
   * ##########################################################################*/

  /**
   * NOTE: Only hashes part of the app data (should be sufficiently accurate for our purposes).
   * @param {Application} app
   */
  makeRelevantAppDataHash(app) {
    const dp = app.dataProvider;
    const relevantData = [
      'asyncEvents',
      'asyncNodes'
    ];
    const serialized = JSON.stringify(
      dp.serializeCollectionsJson(relevantData)
    );
    return sha256String(serialized);
  }

  async writeApplicationDataBackup() {
    const { app } = this;

    // write app data
    this.research.exportResearchAppData(app);

    // write new hash
    const appMeta = {
      appDataHash: this.makeRelevantAppDataHash(app),
      appDataUuid: app.uuid,
      updatedAt: Date.now()
    };

    this.writeAppMeta(appMeta);
  }


  checkAppDataUpdate = async () => {
    const applicationUpdateVersion = this._applicationUpdateVersion;

    let previousAppMeta = this.getAppMeta();
    const { app } = this;
    const zipFpath = this.research.getAppZipFilePath(app);
    const newHash = this.makeRelevantAppDataHash(app);

    if (!previousAppMeta || !existsSync(zipFpath) || newHash !== previousAppMeta.appDataHash) {
      // if app data did not exist or has changed since last time, show modal

      // ask whether to save a backup of app data to separate lfs folder
      const askMsg = `App data of "${this.experimentId}" has changed - Do you want to create a new backup?`;
      if (!await confirm(askMsg, true, true)) {
        return;
      }

      if (applicationUpdateVersion !== this._applicationUpdateVersion) {
        // application has changed during modal
        if (!await confirm('Application data changed during modal. Are you sure you still want to export?', true, true)) {
          return;
        }
      }

      await runTaskWithProgressBar(async (progress/* , cancelToken */) => {
        progress.report({ message: 'writing backup file...' });

        // NOTE: we need this sleep because:
        //     (1) the operation is synchronous, and
        //     (2) progress bar does not get to start rendering if we don't give it a few extra ticks
        await sleep();

        await this.writeApplicationDataBackup();
      });

      // TODO:    -> manage zipped backup of lfs files manually!
    }
    else {
      await showInformationMessage(
        `App data has not changed since last update (${new Date(previousAppMeta.updatedAt)})`
      );
    }
  }

  handleApplicationChanged = async () => {
    if (!this.hasProjectAppData) {
      this._data = null;
      return;
    }
    ++this._applicationUpdateVersion;
  }

  /** ###########################################################################
   * data input
   * ##########################################################################*/

  _statusLabel(annotation, status) {
    const s = EdgeStatus.nameFrom(status);
    return selectedModalBtn(annotation.status === status, s);
  }

  handleClickDefault = async (rootId) => {
    if (rootId === this.currentEdgeRootId) {
      // -> show annotation UI

      const annotation = { ...(this.getEdgeAnnotation(rootId) || { rootId }) };
      let repeat = true;
      let changed = false;
      do {
        const msg = `Categorize edge for toRoot=${rootId}`;
        const btnConfig = {
          // eslint-disable-next-line no-loop-func
          ...Object.fromEntries(EdgeStatus.values.map(status => ([
            this._statusLabel(annotation, status),
            // eslint-disable-next-line no-loop-func
            async () => {
              annotation.status = status;
              changed = true;
              return false;
            }
          ]))),

          // eslint-disable-next-line no-loop-func
          [selectedModalBtn('Tricky', !!annotation.tricky)]: async () => {
            annotation.tricky = !annotation.tricky;
            changed = true;
            return true;
          },

          // eslint-disable-next-line no-loop-func
          Comment: async () => {
            let { comment } = annotation;
            comment = await window.showInputBox({
              title: 'Edit the edge\'s comment',
              placeHolder: '',
              value: comment || ''
            });
            annotation.comment = comment;
            changed = true;
            return true;
          }
        };
        repeat = await showInformationMessage(msg, btnConfig, { modal: true });
      } while (repeat);

      if (changed) {
        this.setEdgeAnnotation(rootId, annotation);
      }
    }
    else {
      // -> go to first trace in edge's toRoot
      const targetTrace = this.dp.util.getFirstTraceOfContext(rootId);
      if (targetTrace) {
        traceSelection.selectTrace(targetTrace);
      }
    }
  }

  // ###########################################################################
  // dispose
  // ###########################################################################

  addDisposable(...disps) {
    this._disposables.push(...disps);
  }

  dispose(/* silent = false */) {
    const { _disposables } = this;
    this._disposables = [];
    this._isDisposed = true;

    _disposables.forEach((disp) => {
      if (isFunction(disp)) {
        disp();
      }
      else {
        disp.dispose();
      }
    });
  }
}

/** ###########################################################################
 * {@link CurrentEdgeNode}
 * ##########################################################################*/

class CurrentEdgeNode extends TraceDetailNode {
  static makeLabel() { return ''; }

  /**
   * @type {EdgeAnalysisController}
   */
  get controller() {
    return this.parent.controller;
  }

  get edgeRootId() {
    return this.controller.currentEdgeRootId;
  }

  get edge() {
    return this.controller.currentEdge;
  }

  init() {
    if (!this.controller?.hasProjectAppData) {
      this.description = `(no data)`;
    }
    else {
      this.description = this.controller.makeEdgeDescription(this.controller.currentEdgeRootId);
    }
  }

  handleClick() {
    return this.controller.handleClickDefault(this.edgeRootId);
  }
}

/** ###########################################################################
 * 
 * ##########################################################################*/

class EdgeListNode extends TraceDetailNode {
  static makeLabel() { return 'All Edges'; }

  /**
   * @type {EdgeAnalysisController}
   */
  get controller() {
    return this.parent.controller;
  }

  init() {
    this._updateDescription();
  }

  _updateDescription(count) {
    const countLabel = count === undefined ? '' : ` (${count})`;
    this.description = `${this.controller?.experimentId || ''}${countLabel}`;
  }

  canHaveChildren() {
    return this.controller?.hasProjectAppData;
  }

  buildChildren() {
    const nodes = this.controller.getAllEdgesSorted().map(edge => {
      return makeTreeItem(
        '',
        EmptyArray,
        {
          description: this.controller.makeEdgeDescription(edge),
          handleClick: this.controller.handleClickDefault
        }
      );
    });

    this._updateDescription(nodes.length);

    return nodes;
  }
}

/** ###########################################################################
 * button node
 * ##########################################################################*/

class AppDataUpdateNode extends TraceDetailNode {
  static makeLabel() { return 'App Data Update'; }

  /**
   * @type {EdgeAnalysisController}
   */
  get controller() {
    return this.parent.controller;
  }

  handleClick() {
    return this.controller?.checkAppDataUpdate();
  }
}

/** ###########################################################################
 * main node
 * ##########################################################################*/

export default class EdgeAnalysisNode extends TraceDetailNode {
  static makeLabel(/* trace, parent */) {
    return 'Edges';
  }

  /**
   * @type {EdgeAnalysisController}
   */
  controller;

  childClasses = [
    AppDataUpdateNode,
    CurrentEdgeNode,
    EdgeListNode
  ];

  _doInit() {
    if (!this.controller) {
      this.controller = new EdgeAnalysisController(this);
    }

    if (!this.controller.research.lookupDataRootFolder()) {
      logError(`dataFolder at "${getDataFolderLink()}" is not configured. Unable to load or write data.`);
    }
    else {
      this.controller.initOnExpand();
    }
  }

  handleCollapsibleStateChanged() {
    if (this.collapsibleState === TreeItemCollapsibleState.Expanded) {
      // expanded
      this._doInit();
    }
    else {
      // collapsed
      this.controller?.dispose();
      this.controller = null;
    }
  }

  buildChildren() {
    this._doInit();

    return this.buildChildrenDefault();
  }
}