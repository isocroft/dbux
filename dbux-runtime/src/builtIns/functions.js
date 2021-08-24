// import DataNodeType from '@dbux/common/src/types/constants/DataNodeType';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import SpecialCallType from '@dbux/common/src/types/constants/SpecialCallType';
import dataNodeCollection from '../data/dataNodeCollection';
import { getTraceOwnDataNode, peekBCEMatchCallee } from '../data/dataUtil';
import { monkeyPatchMethod } from '../util/monkeyPatchUtil';


function getCalledFunctionTid(bceTrace) {
  // get actual function actualFunctionDataNode
  const { /* traceId: callId, */ data: { calleeTid } } = bceTrace;
  const calleeDataNode = getTraceOwnDataNode(calleeTid); // stored in {@link RuntimeMonitor#traceExpressionME}
  const { objectNodeId } = calleeDataNode?.varAccess || EmptyObject;
  const actualFunctionDataNode = objectNodeId && dataNodeCollection.getById(objectNodeId);
  return actualFunctionDataNode?.traceId;
}

function setCalledFunctionTid(bceTrace, specialCallType) {
  // [edit-after-send]
  bceTrace.data.calledFunctionTid = getCalledFunctionTid(bceTrace);
  bceTrace.data.specialCallType = specialCallType;
}

export default function patchFunction() {
  // ###########################################################################
  // call
  // ###########################################################################

  monkeyPatchMethod(Function, 'call',
    (actualFunction, args, originalCall, patchedCall) => {
      const bceTrace = peekBCEMatchCallee(patchedCall);
      if (bceTrace?.data) {
        setCalledFunctionTid(bceTrace, SpecialCallType.Call);
      }

      // console.warn(`call()`, actualFunction.name, bceTrace.traceId);

      return originalCall.bind(actualFunction)(...args);
    }
  );

  // ###########################################################################
  // apply
  // ###########################################################################

  monkeyPatchMethod(Function, 'apply',
    (actualFunction, args, originalApply, patchedApply) => {
      const bceTrace = peekBCEMatchCallee(patchedApply);
      if (bceTrace?.data) {
        setCalledFunctionTid(bceTrace, SpecialCallType.Apply);
      }

      return originalApply.bind(actualFunction)(...args);
    }
  );

  // ###########################################################################
  // bind
  // ###########################################################################

  monkeyPatchMethod(Function, 'bind',
    (actualFunction, args, originalBind, patchedBind) => {
      const bceTrace = peekBCEMatchCallee(patchedBind);
      if (bceTrace?.data) {
        setCalledFunctionTid(bceTrace, SpecialCallType.Bind);
      }

      const result = originalBind.bind(actualFunction)(...args);
      return result;
    }
  );
}