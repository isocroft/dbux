import EmptyArray from '@dbux/common/src/util/EmptyArray';
import sleep from '@dbux/common/src/util/sleep';
import allApplications from '@dbux/data/src/applications/allApplications';
import traceSelection from '@dbux/data/src/traceSelection/index';
import HostComponentEndpoint from '../componentLib/HostComponentEndpoint';

export default class DDGTimelineView extends HostComponentEndpoint {
  init() {
    this.state.nodes = EmptyArray;
    this.state.edges = EmptyArray;
  }

  update() {

  }

  async handleRefresh() {
    let trace = traceSelection.selected;
    if (trace) {
      const { applicationId, contextId } = trace;
      const dp = allApplications.getById(applicationId).dataProvider;
      // const context = dp.collections.executionContexts.getById(contextId);
      const ddgArgs = { applicationId, contextId };
      const failureReason = dp.ddgs.getCreateDDGFailureReason(ddgArgs);
      if (failureReason) {
        this.setFailure(failureReason);
      }
      else {
        const ddg = dp.ddgs.getOrCreateDDGForContext(ddgArgs);
        const { nodes, edges } = ddg;
        this.setState({ nodes, edges });
      }
    }
    else {
      const failureReason = 'DDG is empty';
      this.setFailure(failureReason);
    }
  }

  setFailure(failureReason) {
    this.setState({ failureReason, nodes: EmptyArray, edges: EmptyArray });
  }

  shared() {
    return {
      context: {
        view: this
      }
    };
  }
}