// import { instrumentCallExpressionEnter } from '../zz_archive/traceHelpers.old';
import { isNotArgsTraceableIfConstantType, isNotCalleeTraceableType } from '@dbux/common/src/types/constants/SpecialIdentifierType';
import TraceType from '@dbux/common/src/types/constants/TraceType';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import { makeSpreadableArgumentArrayCfg } from '../helpers/argsUtil';
import { traceCallExpressionDefault } from '../instrumentation/callExpressions';
import BaseNode from './BaseNode';


function getCalleePlugin(node) {
  const [calleePath] = node.getChildPaths();
  if (calleePath.isMemberExpression() && !isNotCalleeTraceableNodeME(calleePath)) {
    return 'CalleeME';
  }
  // if (!pluginName) {
  //   // node.logger.error(`unknown callee type: "${type}" at "${pathToString(calleePath)}"`);
  // }
  // no special handling
  return null;
}

/**
 * `super.f()` cannot be traced
 */
function isNotCalleeTraceableNodeME(calleePath) {
  return calleePath.get('object').isSuper();
}


/**
 * Check for traceability of potential special functions. 
 */
function isNotCalleeTraceableNode(calleeNode) {
  if (calleeNode.path.isMemberExpression()) {
    return isNotCalleeTraceableNodeME(calleeNode.path);
  }
  const { specialType } = calleeNode;
  return specialType && isNotCalleeTraceableType(specialType);
}

function isNotArgsTraceableIfConstantNode(calleeNode) {
  if (calleeNode.path.isMemberExpression()) {
    return true;
  }
  const { specialType } = calleeNode;
  return specialType && isNotArgsTraceableIfConstantType(specialType);
}

// ###########################################################################
// CallExpression
// ###########################################################################


export default class CallExpression extends BaseNode {
  static visitors = [
    `CallExpression`,
    `OptionalCallExpression`,
    `NewExpression`
  ];
  static plugins = [
    {
      plugin: getCalleePlugin,
      alias: 'callee'
    }
  ];
  static children = ['callee', 'arguments'];

  get calleeNode() {
    const [calleeNode] = this.getChildNodes();
    return calleeNode;
  }

  // function enterCallExpression(traceResultType, path, state) {
  //   // CallExpression

  //   // TODO: need to fix for parameter assignments in function declarations: 
  //   //      -> `function f(x = o.g()) { }`
  //   //      NOTE: in this case, utility variables are allocated inside function; but that would change semantics.
  //   const parent = path.parentPath;
  //   const grandParent = path.parentPath?.parentPath;
  //   if (grandParent &&
  //     t.isFunction(grandParent) &&
  //     grandParent.node.params.includes(parent.node)
  //   ) {
  //     // ignore
  //   }
  //   else {
  //     path = instrumentCallExpressionEnter(path, state);
  //     path.setData('traceResultType', traceResultType);
  //   }
  // }

  /**
   * NOTE: the name chosen here will show up in error messages
   */
  generateCalleeVar(calleePath) {
    this._calleeVar = calleePath.scope.generateUidIdentifierBasedOnNode(calleePath.node);
    return this._calleeVar;
    // return calleePath.node.name || 'func';
  }

  exit1() {
    // NOTE: we do this here, since `CalleeME` will not always get initialized
    const { calleeNode } = this;
    calleeNode.handler = this;
  }

  exit() {
    // TODO: more special cases - super, import, require
    //    -> cannot separate callee for `super` or `import`
    //    -> cannot modify args for `import` or `require`, if they are constants
    const {
      path,
      // path: { scope },
      plugins: {
        callee: calleePlugin
      }
    } = this;


    /**
     * TODO:
     * 1. special case: built-in functions
     *    * built-ins should be monkey-patched
     * 2. monkey-patched callbacks
     * 3. special case: `bind` etc.
     */

    const [calleePath, argumentPaths] = this.getChildPaths();
    const [calleeNode/* , argumentNodes */] = this.getChildNodes();

    // 1. make sure, callee is traced (if is traceable)
    let calleeVar = null;
    const isCalleeTraceable = !isNotCalleeTraceableNode(calleeNode);
    if (isCalleeTraceable) {
      this.Traces.addDefaultTrace(calleePath);
      calleeVar = this.generateCalleeVar(calleePath);
    }

    // ###########################################################################
    // 2. trace args + 3. BCE
    // ###########################################################################

    // only trace args if (1) not require or import, OR (2) it has non-constant arguments
    const shouldTraceArgs = !isNotArgsTraceableIfConstantNode(calleeNode) || 
      argumentPaths.some(argPath => !argPath.isConstantExpression());

    const bceTraceData = {
      path,
      // node: this,
      staticTraceData: {
        type: TraceType.BeforeCallExpression,
        data: {
          argConfigs: makeSpreadableArgumentArrayCfg(argumentPaths),
        }
      },
      meta: {
        // NOTE: will be instrumented by `CallExpressionResult`
        instrument: null
      }
    };

    bceTraceData.staticTraceData.data.specialType = calleeNode.specialType;

    const bceInputPaths = shouldTraceArgs && argumentPaths || EmptyArray;
    const bceTrace = this.Traces.addTraceWithInputs(bceTraceData, bceInputPaths);

    /**
     * @see `CalleeME`
     */
    const instrument = calleePlugin?.instrumentCallExpression || traceCallExpressionDefault;
    const bceTidIdentifier = bceTrace.tidIdentifier;

    // ###########################################################################
    // 4. wrap `CallExpression` (as `CallExpressionResult`)
    // ###########################################################################

    const trace = this.Traces.addTrace({
      path,
      node: this,
      staticTraceData: {
        type: TraceType.CallExpressionResult
      },
      data: {
        bceTrace,
        calleeNode,
        calleeVar,
        shouldTraceArgs
      },
      meta: {
        traceCall: 'traceCallResult',
        instrument,
        moreTraceCallArgs: [bceTidIdentifier]
      }
    });

    // 5. callee might add modifications
    calleePlugin?.decorateCallTrace(trace);
  }

  instrument1() {
    const { path } = this;
    const id = this._calleeVar;
    if (id) {
      path.scope.push({
        id
      });
    }
  }
}