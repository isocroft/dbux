import serializeObj from 'serialize-javascript';
import NestedError from '@dbux/common/src/NestedError';
import ParseNode from '../parseLib/ParseNode';
import StaticContext from './plugins/StaticContext';
import TraceCfg from '../definitions/TraceCfg';
import { pathToStringAnnotated } from '../helpers/pathHelpers';


const Verbose = 2;


function concatArrays(a, b) {
  if (a && b) {
    return a.concat(b);
  }
  return a || b;
}

/**
 * Custom layer on top of generic ParseNode.
 */
export default class BaseNode extends ParseNode {
  static plugins = ['Traces'];

  /**
   * NOTE: Managed by `plugins/Traces`
   * @type {TraceCfg}
   */
  _traceCfg;

  constructor(...args) {
    super(...args);
  }

  get traceCfg() {
    return this._traceCfg;
  }

  /**
   * @return {import('./plugins/Traces').default}
   */
  get Traces() {
    return this.getPlugin('Traces');
  }

  /**
   * @type {StaticContext}
   */
  get StaticContext() {
    return this.peekPluginForce('StaticContext');
  }

  getRealContextIdVar() {
    const { contextIdVar: realContextIdVar } = this.StaticContext;
    return realContextIdVar;
  }


  // ###########################################################################
  // get
  // ###########################################################################

  /**
   * @returns {BaseNode}
   */
  getDeclarationNode() {
    let declarationNode = this;
    let next;

    // NOTE: Babel's bindings can be recursive if a symbol name is defined multiple times inside the same scope.
    while ((next = declarationNode.getOwnDeclarationNode()) && next !== declarationNode) {
      declarationNode = next;
      // this.logger.debug(`  ([getDeclarationNode] "${this.debugTag}" → "${declarationNode.debugTag}")`);
    }

    // this.logger.debug(`[getDeclarationNode] "${this.debugTag}" → "${declarationNode.debugTag}"`);
    return declarationNode;
  }

  getOwnDeclarationNode() {
    return undefined;
  }

  getTidIdentifier() {
    if (!this._traceCfg) {
      this.warn(`Tried to "getTidIdentifier" before node trace was added (maybe the node is disabled or its syntax not yet supported?): ${this}`);
      return null;
    }
    return this._traceCfg.tidIdentifier;
  }

  getDeclarationTidIdentifier() {
    const decl = this.getDeclarationNode();
    if (decl) {
      if (!decl.getTidIdentifier) {
        throw new Error(`"getDeclarationNode" returned "${decl}", which has no "getTidIdentifier" in "${this}"`);
      }
      return decl.getTidIdentifier();
    }
    return undefined;
  }

  /**
   * Hackfix for `ArithmeticExpression` to deal w/ `UnaryExpression` children.
   */
  getDefaultChildPaths() {
    return this.getChildPaths();
  }

  /** ###########################################################################
   * misc
   * ##########################################################################*/

  /**
   * NOTE: same path can be wrapped multiple times.
   * This will store the latest (outer-most) version of it.
   */
  _setTraceCfg(traceData) {
    this._traceCfg = traceData;
    // Verbose > 1 && this.logger.trace(`[${pathToStringAnnotated(this.path, true, 50)}] _setTraceCfg`);
  }

  /**
   * @protected
   */
  buildDefaultTrace() {
    // this.logger.warn(`ParseNode did not implement "buildDefaultTrace": ${this}`);
    return null;
  }

  /**
   * NOTE: Should be called `addDefaultTraceIfHasNone`.
   */
  addDefaultTrace() {
    try {
      if (!this._traceCfg) {
        const traceData = this.buildDefaultTrace();
        if (!traceData) {
          return null;
        }
        const trace = this.Traces.addTrace(traceData);
        if (trace && !this._traceCfg) {
          // hackfix: target trace got attached to another trace, probably a binding trace...
          //      not sure, if we can just do this, but for now it works.
          this._traceCfg = trace;
        }
      }
      else {
        // NOTE: This is a common ocurrence. Only add default trace if noy already added.
        // const originalDT = this._traceCfg;
        // const newDT = this.buildDefaultTrace();
        // const verboseData = `original=${originalDT},\n new=${newDT}`;
        // Verbose > 1 && this.logger.trace(`##### [${pathToStringAnnotated(this.path, true, 50)}] Tried to addDefaultTrace even though Node already has one.`
        /* '\n########', '\n original=', originalDT, '\n\n new=', newDT, '\n#######\n\n' */
        // );
      }
    }
    catch (err) {
      throw new NestedError(`addDefaultTrace failed for Node ${this}`, err);
    }
    return this._traceCfg;
  }

  // ###########################################################################
  // Tree Accessors
  // ###########################################################################

  /**
   * @return {StaticContext}
   */
  peekStaticContext() {
    return this.peekPluginForce('StaticContext');
  }

  peekContextNode() {
    return this.peekPlugin('StaticContext').node;
  }


  // ###########################################################################
  // static
  // ###########################################################################

  get logger() {
    return this.constructor.logger;
  }
}