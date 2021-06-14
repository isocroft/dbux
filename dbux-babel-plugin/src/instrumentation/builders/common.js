/**
 * Helpers to generate partial AST's.
 */

import { parse } from '@babel/parser';
import { codeFrameColumns } from "@babel/code-frame";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import { UndefinedNode } from './buildUtil';
// import { template } from '@babel/core';

export function buildNamedExport(ids) {
  return t.exportNamedDeclaration(null, ids.map(id => t.exportSpecifier(id, id)));
}


// const errHandlerTemplate = template(`
// console.error(err);
// throw err;
// `);

export function buildTryFinally(tryNodes, finallyNodes) {
  if (tryNodes.length === 1 && t.isBlockStatement(tryNodes[0])) {
    [tryNodes] = tryNodes; // same as: `tryNodes = tryNodes[0]`
  }
  else {
    tryNodes = t.blockStatement(tryNodes);
  }

  const catchClause = null;
  // const catchClause = t.catchClause(
  //   t.identifier('err'),
  //   t.blockStatement(errHandlerTemplate({
  //   }))
  // );
  return t.tryStatement(tryNodes, catchClause, t.blockStatement(finallyNodes));
}

export function buildBlock(statements) {
  return t.blockStatement(Array.isArray(statements) ? statements : [statements]);
}

export function buildVarDecl(ids) {
  const kind = "let";
  const declarations = ids.map((id) => {
    return t.variableDeclarator(id, null);
  });
  return t.variableDeclaration(kind, declarations);
}

export function buildVarAssignments(ids, values) {
  const assignments = ids.map((id, i) => {
    return t.expressionStatement(t.assignmentExpression('=', id, values[i]));
  });
  return assignments;
}

/**
 * Wrap a block with a try/finally pair
 */
export function buildWrapTryFinally(tryNodes, finallyBody) {
  tryNodes = Array.isArray(tryNodes) ? tryNodes : [tryNodes];
  return buildTryFinally(tryNodes, finallyBody);
}

export function buildProgram(origPathOrNode, bodyNodes) {
  const newProgramNode = t.cloneNode(origPathOrNode.node || origPathOrNode);
  newProgramNode.body = bodyNodes;
  return newProgramNode;
}

// ###########################################################################
// buildSource
// ###########################################################################

/**
 * Build AST from source through @babel/parser
 * @param {String} source 
 * @return {SourceNode[]}
 */
export function buildSource(source) {
  let ast;
  try {
    // source = `${source}`;
    ast = parse(source);
  } catch (err) {
    const { loc } = err;
    if (loc) {
      err.message +=
        "\n" +
        codeFrameColumns(source, {
          start: {
            line: loc.line,
            column: loc.column + 1,
          },
        });
    }
    throw err;
  }

  const nodes = ast.program.body;
  nodes.forEach(n => traverse.removeProperties(n));
  return nodes;
}

// ###########################################################################
// utilities
// ###########################################################################

export function getReplacePath(traceCfg) {
  const {
    meta: {
      replacePath
    } = EmptyObject
  } = traceCfg;
  return replacePath;
}


export function getInstrumentPath(traceCfg) {
  return getReplacePath(traceCfg) || traceCfg.path;
}

/**
 * NOTE: actual `targetNode` node might have been moved
 *    -> E.g. by `CallExpression`, `CalleeMemberExpression`, `ObjectMethod`.
 */
export function getInstrumentTargetAstNode(traceCfg) {
  const {
    meta: {
      targetNode
    } = EmptyObject
  } = traceCfg;
  return targetNode || getInstrumentPath(traceCfg).node || UndefinedNode;
}

