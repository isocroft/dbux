import Trace from '@dbux/common/src/types/Trace';
import traceSelection from '@dbux/data/src/traceSelection';
import { makeTraceLabel, makeTraceLocLabel } from '@dbux/data/src/helpers/makeLabels';
import UserActionType from '@dbux/data/src/pathways/UserActionType';
import allApplications from '@dbux/data/src/applications/allApplications';
import BaseTreeViewNode from '../../codeUtil/BaseTreeViewNode';

export default class TraceNode extends BaseTreeViewNode {
  get clickUserActionType() {
    return UserActionType.TDTraceUse;
  }

  /**
   * @param {Trace} 
   */
  static makeLabel(trace) {
    return makeTraceLabel(trace);
  }

  /**
   * @type {Trace}
   */
  get trace() {
    return this.entry;
  }

  get dp() {
    const { applicationId } = this.trace;
    return allApplications.getById(applicationId).dataProvider;
  }

  isSelected() {
    return traceSelection.isSelected(this.trace);
  }

  makeIconPath() {
    return this.isSelected() ? 'play.svg' : ' ';
  }

  init() {
    // description
    // NOTE: description MUST be a string or it won't be properly displayed
    // const dt = getTraceCreatedAt(this.trace);
    const loc = makeTraceLocLabel(this.trace);
    this.description = loc;
  }

  handleClick() {
    traceSelection.selectTrace(this.trace, 'TraceNode');
  }
}