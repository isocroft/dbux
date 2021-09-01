import TraceType from '@dbux/common/src/types/constants/TraceType';
// import { buildTraceNoValue } from './traceHelpers.old';
import { buildTraceNoValue_OLD } from './builders/misc';

export function buildContextEndTrace(path, state) {
  return buildTraceNoValue_OLD(path, state, { type: TraceType.EndOfContext });
}

/**
 * We inject `EndOfContext` at the end of any `function` and `program`
 * to allow us more accurately guess whether and where errors have.
 */
export function injectContextEndTrace(path, state) {
  // trace `EndOfContext` at the end of program or function body
  const bodyPath = path.get('body');
  const endOfContext = buildContextEndTrace(path, state);

  // hackfix: babel-traverse seems to force us to handle array and non-array separately
  if (bodyPath.node) {
    bodyPath.insertAfter(endOfContext);
  }
  else {
    path.pushContainer('body', endOfContext);
  }
}