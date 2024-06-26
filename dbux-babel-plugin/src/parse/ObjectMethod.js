import * as t from '@babel/types';
import { buildTraceExpression } from '../instrumentation/builders/misc';
import BaseNode from './BaseNode';

/**
 * 
 */
export default class ObjectMethod extends BaseNode {
  static children = [
    'key',
    'params',
    'body'
  ];
  static plugins = [
    'Function',
    'StaticContext'
  ];

  buildDefaultTrace() {
    const { path } = this;
    const [keyPath] = this.getChildPaths();

    return {
      path,
      node: this,
      scope: path.parentPath.scope, // prevent adding `tid` variable to own body
      staticTraceData: this.getPlugin('Function').createStaticTraceData(keyPath),
      meta: {
        instrument: this.convertToObjectProperty
      }
    };
  }

  addDefaultTrace() {
    // TODO: `decorators`

    /**
     * TODO: `ObjectMethod` -> `kind !== 'method'`
     *  -> Consider using `defineProperty`
     *  -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#defining_a_getter_on_existing_objects_using_defineproperty
     *
     * Consider:
     * ```js
       var o = {
        a: 0,
        get b() { return this.a + 1; }
      };
      Object.getOwnPropertyDescriptor(o, 'b').get
      ```
     */

    const [keyNode] = this.getChildNodes();
    // NOTE: non-computed keys don't have their own ParseNode (for now).
    //      `ObjectExpression` instrumentation will assure correct traces + DataNodes nevertheless.
    if (keyNode?.path && !keyNode.path.isLiteral()) {
      // NOTE: method name can be a string literal. 
      //    In which case, we can trace it (but need to convert to `computed`).
      //  -> For now, just don't instrument.
      keyNode.addDefaultTrace();
    }

    // add trace
    const traceCfg = super.addDefaultTrace();

    const Function = this.getPlugin('Function');
    Function.setFunctionTraceCfg(traceCfg);

    return traceCfg;
  }

  convertToObjectProperty = () => {
    const { path, state, traceCfg } = this;

    const { key, params, body, generator, async, computed, shorthand, decorators } = path.node;

    // don't use `key` as-is -> avoid collisions
    const id = (t.isIdentifier(key) && key.name) ?
      path.scope.generateUidIdentifier(key.name) :
      null;

    // convert `ObjectMethod` to `FunctionExpression`
    traceCfg.meta.targetNode = t.functionExpression(
      id,
      params,
      body,
      generator,
      async
    );
    const value = buildTraceExpression(state, traceCfg);

    path.replaceWith(t.objectProperty(
      key,
      value,
      computed,
      shorthand,
      decorators
    ));
  }
}