import allApplications from '@dbux/data/src/applications/allApplications';
import { makeContextLabel } from '@dbux/data/src/helpers/makeLabels';
import TraceType from '@dbux/common/src/types/constants/TraceType';
import ExecutionContextType from '@dbux/common/src/types/constants/ExecutionContextType';
import BaseTreeViewNode from '../../codeUtil/treeView/BaseTreeViewNode';

/** @typedef {import('@dbux/data/src/applications/Application').default} Application */

// ###########################################################################
// Info: Application
// ###########################################################################

export class ApplicationTDNode extends BaseTreeViewNode {
  static makeEntry(trace) {
    const application = allApplications.getApplication(trace.applicationId);
    const fpath = application.dataProvider.util.getTraceFilePath(trace.traceId);
    const n = allApplications.selection.data.getApplicationCountAtPath(fpath);
    if (n < 2) {
      return null;
    }
    return application;
  }

  /**
   * @param {Application} application 
   */
  static makeLabel(application) {
    return `${application.getRelativeFolder()} [Application]`;
  }

  get application() {
    return this.entry;
  }

  handleClick() {
    // TODO: go to Application's first trace?
    // goToTrace(firstTrace);
  }

  // makeIconPath() {
  //   return 'string.svg';
  // }
}

// ###########################################################################
// Info: Context
// ###########################################################################

export class ContextTDNode extends BaseTreeViewNode {
  static makeEntry(trace) {
    const application = allApplications.getApplication(trace.applicationId);
    return application.dataProvider.util.getTraceContext(trace.traceId);
  }

  static makeLabel(context, parent) {
    const application = allApplications.getApplication(parent.trace.applicationId);
    const { contextType } = context;
    const typeName = ExecutionContextType.nameFrom(contextType);
    return `Context: ${makeContextLabel(context, application)} [${typeName}]`;
  }

  // makeIconPath(application: Application) {
  //   return 'string.svg';
  // }
}

// ###########################################################################
// Info: TraceType
// ###########################################################################

export class TraceTypeTDNode extends BaseTreeViewNode {
  static makeLabel(trace) {
    const application = allApplications.getApplication(trace.applicationId);
    const traceType = application.dataProvider.util.getTraceType(trace.traceId);
    const typeName = TraceType.nameFrom(traceType);
    return `TraceType: ${typeName}`;
  }

  // makeIconPath(traceDetail) {
  //   return 'string.svg';
  // }
}


// ###########################################################################
// Info
// ###########################################################################

export class InfoTDNode extends BaseTreeViewNode {
  static makeLabel() {
    return 'Info';
  }

  buildChildren() {
    return this.treeNodeProvider.buildDetailNodes(this.trace, this, [
      ApplicationTDNode,
      ContextTDNode,
      TraceTypeTDNode,
    ]);
  }
}