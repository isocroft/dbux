import * as t from "@babel/types";
import { getInstrumentTargetAstNode } from './common';
import { buildTraceCall } from './templateUtil';
import { buildTraceId, buildTraceIdValue } from './traceId';


export const buildWrapAwait = buildTraceCall(
  `(%%wrapAwait%%(
  %%argumentVar%% = %%argument%%,
  %%awaitContextIdVar%% = %%preAwait%%(%%awaitStaticContextId%%, %%tid%%, %%argumentVar%%)
))`,
  function buildWrapAwait(state, traceCfg) {
    const { ids: { aliases: { preAwait, wrapAwait } } } = state;
    const {
      data: {
        argumentVar,
        awaitStaticContextId,
        awaitContextIdVar
      }
    } = traceCfg;
    const argument = getInstrumentTargetAstNode(state, traceCfg);
    const tid = buildTraceId(state, traceCfg);
    // TODO: add argumentVar
    // const { } = ;

    return {
      preAwait,
      wrapAwait,
      argument,
      argumentVar,
      awaitContextIdVar,
      awaitStaticContextId: t.numericLiteral(awaitStaticContextId),
      tid,
    };
  }
);

export const buildPostAwait = buildTraceCall(
  // future-work: I forgot why `tid` was not part of the `postAwait` call?
  `(
  %%resultVar%% = %%awaitNode%%,
  %%postAwait%%(%%resultVar%%, %%argumentVar%%, %%awaitContextIdVar%%),
  %%tid%%,
  %%resultVar%%
)`,
  function buildPostAwait(state, traceCfg) {
    const { ids: { aliases: { 
      postAwait
    } } } = state;
    const {
      data: {
        argumentVar,
        resultVar,
        awaitContextIdVar
      }
    } = traceCfg;
    const awaitNode = getInstrumentTargetAstNode(state, traceCfg);
    const tid = buildTraceIdValue(state, traceCfg, resultVar);

    return {
      resultVar,
      awaitNode,
      argumentVar,
      postAwait,
      awaitContextIdVar,
      tid
    };
  }
);