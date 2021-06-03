import ExecutionContext from '@dbux/common/src/core/data/ExecutionContext';
import Trace from '@dbux/common/src/core/data/Trace';
import ValueRef from '@dbux/common/src/core/data/ValueRef';
import Loop from '@dbux/common/src/core/data/loops/Loop';
import PromiseData from '@dbux/common/src/core/data/PromiseData';
import AsyncEvent from '@dbux/common/src/core/data/AsyncEvent';

/**
 * TODO: proper object pooling
 */
const pools = {
  executionContexts: {
    /**
     * @return {ExecutionContext}
     */
    allocate() {
      return new ExecutionContext();
    }
  },

  traces: {
    allocate() {
      return new Trace();
    }
  },

  values: {
    allocate() {
      return new ValueRef();
    }
  },

  loops: {
    allocate() {
      return new Loop();
    }
  },

  promiseData: {
    allocate() {
      return new PromiseData();
    },
  },

  asyncEvent: {
    allocate() {
      return new AsyncEvent();
    }
  }
};

export default pools;