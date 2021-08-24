import DataNodeType from '@dbux/common/src/types/constants/DataNodeType';
import dataNodeCollection from '../data/dataNodeCollection';
import { peekBCEMatchCallee } from '../data/dataUtil';
import valueCollection from '../data/valueCollection';
import { monkeyPatchFunctionOverride, monkeyPatchMethod, monkeyPatchMethodOverrideDefault } from '../util/monkeyPatchUtil';


// ###########################################################################
// utility
// ###########################################################################

function getNodeIdFromRef(ref) {
  const { nodeId } = ref;
  return nodeId;
}

function wrapIndex(i, arr) {
  if (i >= 0) {
    return i;
  }
  else {
    return arr.length + i;
  }
}

export default function patchArray() {
  // ###########################################################################
  // push
  // ###########################################################################

  monkeyPatchMethod(Array, 'push',
    (arr, args, originalFunction, patchedFunction) => {
      const ref = valueCollection.getRefByValue(arr);
      const bceTrace = ref && peekBCEMatchCallee(patchedFunction);
      if (!bceTrace) {
        return originalFunction.apply(arr, args);
      }

      const { traceId: callId } = bceTrace;
      const objectNodeId = getNodeIdFromRef(ref);

      for (let i = 0; i < args.length; ++i) {
        const varAccess = {
          objectNodeId,
          prop: arr.length + i
        };
        // console.debug(`[Array.push] #${traceId} ref ${ref.refId}, node ${nodeId}, objectNodeId ${objectNodeId}`);
        dataNodeCollection.createDataNode(args[i], callId, DataNodeType.Write, varAccess);
      }

      // [edit-after-send]
      bceTrace.data = bceTrace.data || {};
      bceTrace.data.monkey = {
        wireInputs: true
      };

      return originalFunction.apply(arr, args);
    }
  );


  // ###########################################################################
  // slice
  // ###########################################################################

  monkeyPatchMethod(Array, 'slice',
    (arr, args, originalFunction, patchedFunction) => {
      let [start, end] = args;
      const ref = valueCollection.getRefByValue(arr);
      const bceTrace = ref && peekBCEMatchCallee(patchedFunction);
      const newArray = originalFunction.apply(arr, args);
      if (!bceTrace) {
        return newArray;
      }

      const { traceId: callId } = bceTrace;
      const arrNodeId = getNodeIdFromRef(ref);

      // let BCE hold DataNode of newArray
      const newArrayNode = dataNodeCollection.createOwnDataNode(newArray, callId, DataNodeType.Write);

      start = !Number.isNaN(start) ? wrapIndex(start, arr) : 0;
      end = !Number.isNaN(end) ? wrapIndex(end, arr) : arr.length - 1;

      // record all DataNodes of copy operation
      for (let i = start; i < end; ++i) {
        const varAccessRead = {
          objectNodeId: arrNodeId,
          prop: i
        };
        const readNode = dataNodeCollection.createDataNode(arr[i], callId, DataNodeType.Read, varAccessRead);

        const varAccessWrite = {
          objectNodeId: newArrayNode.nodeId,
          prop: i - start
        };
        dataNodeCollection.createWriteNodeFromReadNode(callId, readNode, varAccessWrite);
      }
      return newArray;
    }
  );

  /** ###########################################################################
   * other (make non-patchable for now)
   * ###########################################################################*/

  // var ign = new Set(['constructor', 'at']);
  // copy(Object.getOwnPropertyNames(Array.prototype).filter(f => Array.prototype[f] instanceof Function && 
  //  !ign.has(f)))
  [
    "concat",
    "copyWithin",
    "fill",
    "find",
    "findIndex",
    "lastIndexOf",
    "pop",
    "push",
    "reverse",
    "shift",
    "unshift",
    "slice",
    "sort",
    "splice",
    "includes",
    "indexOf",
    "join",
    "keys",
    "entries",
    "values",
    "forEach",
    "filter",
    "flat",
    "flatMap",
    "map",
    "every",
    "some",
    "reduce",
    "reduceRight",
    "toLocaleString",
    "toString"
  ].forEach(key => monkeyPatchMethodOverrideDefault(Array, key));
}