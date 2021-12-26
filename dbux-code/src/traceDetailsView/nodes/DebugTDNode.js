import EmptyObject from '@dbux/common/src/util/EmptyObject';
import { renderValueSimple } from '@dbux/common/src/util/stringUtil';
import { parsePackageName } from '@dbux/common-node/src/util/moduleUtil';
import UserActionType from '@dbux/data/src/pathways/UserActionType';
import AsyncEventUpdateType, { isPostEventUpdate } from '@dbux/common/src/types/constants/AsyncEventUpdateType';
import traceSelection from '@dbux/data/src/traceSelection';
import makeTreeItem, { makeTreeItemNoChildren, makeTreeItems } from '../../helpers/makeTreeItem';
import { ContextTDNode, TraceTypeTDNode } from './traceInfoNodes';
import TraceDetailNode from './TraceDetailNode';

/** @typedef {import('@dbux/common/src/types/Trace').default} Trace */

/** ###########################################################################
 * util
 *  #########################################################################*/

function makeArrayLengthLabel(arr, label) {
  return `${label && (label + ' ') || ''}(${arr?.length || 0})`;
}

function makeObjectArrayNodes(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([name, arr]) => [makeArrayLengthLabel(arr, name), arr || {}])
  );
}

function parseStackTrace(stackTrace) {
  if (!stackTrace) {
    return [];
  }
  if (stackTrace.startsWith('"')) {
    stackTrace = JSON.parse(stackTrace);
  }
  const packages = Array.from(new Set(
    stackTrace.split('\n')
      .filter(s => s.includes('node_modules'))
      .map((s) => {
        // s = s.trim();
        return parsePackageName(s);
      })
      .filter(s => !!s)
  ));

  return {
    packages,
    raw: stackTrace
  };
}

// ###########################################################################
// Debug
// ###########################################################################


export class DebugTDNode extends TraceDetailNode {
  static makeLabel(/* trace, parent */) {
    return 'Debug';
  }

  get collapseChangeUserActionType() {
    return UserActionType.TDDebugUse;
  }

  init() {
    this.description = `id: ${this.trace.traceId}`;
  }

  /** ###########################################################################
   * more util
   *  #########################################################################*/

  mapPostAsyncEvent = (postEventUpdate) => {
    return {
      ...postEventUpdate,
      ...this.dp.util.getPostEventUpdateData(postEventUpdate)
    };
  }

  makeAsyncUpdateItem = (upd) => {
    const { dp } = this;
    return makeTreeItem(
      `${upd.rootId}`,
      upd,
      {
        description: `${AsyncEventUpdateType.nameFrom(upd.type)} ${upd.schedulerTraceId}`,
        handleClick: () => {
          const schedulerTrace = dp.util.getTrace(upd.schedulerTraceId);
          if (schedulerTrace) {
            traceSelection.selectTrace(schedulerTrace);
          }
        }
      }
    );
  }

  /** ###########################################################################
   * {@link buildChildren}
   *  #########################################################################*/

  // makeIconPath(traceDetail) {
  //   return 'string.svg';
  // }

  buildChildren() {
    const { trace, dp } = this;

    const {
      traceId,
      nodeId,
      contextId,
      rootContextId,
      // runId,
      staticTraceId,
      ...otherTraceProps
    } = trace;

    let context = dp.collections.executionContexts.getById(contextId) || EmptyObject;
    context = {
      ...context,
      stackTrace: parseStackTrace(context.stackTrace)
    };
    const rootContext = dp.collections.executionContexts.getById(rootContextId);

    const staticTrace = dp.collections.staticTraces.getById(staticTraceId);
    const { staticContextId } = context;
    const staticContext = dp.collections.staticContexts.getById(staticContextId) || EmptyObject;
    const { programId } = staticContext;
    const staticProgramContext = dp.collections.staticProgramContexts.getById(programId) || EmptyObject;
    const dataTraceId = dp.util.getValueTrace(traceId)?.traceId || traceId;

    /** ###########################################################################
     * context
     *  #########################################################################*/

    const contextNode = [`context`, context, { description: `${context?.contextId}` }];
    const rootContextNode = [`rootContext`, rootContext, { description: `${rootContext?.contextId}` }];


    // ###########################################################################
    // dataNodes
    // ###########################################################################
    const ownDataNodes = dp.indexes.dataNodes.byTrace.get(traceId);
    const dataNodes = dp.util.getDataNodesOfTrace(dataTraceId);

    let dataNode;
    if (nodeId) {
      dataNode = dp.collections.dataNodes.getById(nodeId);
    }
    else {
      dataNode = dataNodes?.[0];
    }

    let dataNodeIndex = dataNodes?.indexOf(dataNode);
    const isInDataNodes = dataNodeIndex >= 0;
    dataNodeIndex = isInDataNodes ? dataNodeIndex : ownDataNodes?.indexOf(dataNode);

    // eslint-disable-next-line no-nested-ternary
    const ownDataNodeContainer = isInDataNodes ? 'dataNodes' : 'ownDataNodes';
    const ownDataNodeLabel = dataNode ? `${ownDataNodeContainer}[${dataNodeIndex}]` : `dataNodes: []`;
    const dataNodeCount = dataNodes?.length || 0;

    const allDataNodes = [];
    !!dataNode && allDataNodes.push([
      ownDataNodeLabel,
      dataNode,
      { description: `nodeId=${dataNode.nodeId}, valueId=${dataNode.valueId}, accessId=${dataNode.accessId}` }
    ]);
    dataNodeCount > 1 && allDataNodes.push([
      `all dataNodes (${dataNodeCount})`,
      dataNodes
    ]);
    ownDataNodes && ownDataNodes !== dataNodes && allDataNodes.push([
      `ownDataNodes (${ownDataNodes.length})`,
      ownDataNodes
    ]);


    // ###########################################################################
    // valueRef
    // ###########################################################################

    const valueRef = dp.util.getTraceValueRef(dataTraceId);
    const refId = valueRef?.refId || 0;
    const promiseId = valueRef?.isThenable && refId || 0;
    const hasValue = !!refId || !!dataNode?.hasValue;
    let valueNode;
    if (!hasValue) {
      valueNode = makeTreeItemNoChildren(
        'no value',
        {
          description: '(no value or undefined)'
        }
      );
    }
    else if (refId) {
      valueNode = [
        'valueRef',
        valueRef,
        {
          description: `refId=${refId}`
        }
      ];
    }
    else {
      valueNode = makeTreeItemNoChildren(
        'value',
        {
          description: renderValueSimple(dataNode.value)
        }
      );
    }
    // const promiseData = dataProvider.collections.promises.getById(context.promiseId);
    // const promiseNode = [
    //   'promise', 
    //   promiseData,
    //   { 
    //     description: (promiseData?.valueId + '') || 0
    //   }
    // ];
    // ###########################################################################
    // async (Root)
    // ###########################################################################

    const asyncNode = dp.indexes.asyncNodes.byRoot.getFirst(rootContextId);
    const asyncEventUpdates = dp.indexes.asyncEventUpdates.byRoot.get(rootContextId);

    // one POST event per `rootId`
    const postEventUpdates = asyncEventUpdates?.filter(({ type }) => isPostEventUpdate(type));
    const postEventUpdateData = postEventUpdates?.map(this.mapPostAsyncEvent);

    // many PRE events per `rootId`
    const otherEventUpdates = asyncEventUpdates?.
      filter(({ type }) => !isPostEventUpdate(type))?.
      map(this.makeAsyncUpdateItem);

    const rootNode = makeTreeItem(
      'Root',
      {
        AsyncNode: asyncNode,
        PostEventUpdateData: makeTreeItem(
          'PostEventUpdateData',
          postEventUpdateData?.length === 1 ? postEventUpdateData[0] : (postEventUpdateData || {}),
          { description: `${postEventUpdateData?.map(upd => AsyncEventUpdateType.nameFrom(upd.type)) || ''}` }
        ),
        ...makeObjectArrayNodes({
          OtherUpdates: otherEventUpdates,
        }),
      },
      {
        description: `rootId=${rootContextId}${postEventUpdateData?.map(upd => ` (${AsyncEventUpdateType.nameFrom(upd.type)})`) || ''}`
      }
    );

    /** ########################################
     * async (Promise)
     * #######################################*/

    const promiseLinksFrom = promiseId && dp.indexes.promiseLinks.from.get(promiseId) || null;
    const promiseLinksTo = promiseId && dp.indexes.promiseLinks.to.get(promiseId) || null;
    const promiseUpdates = promiseId && dp.indexes.asyncEventUpdates.byPromise.get(promiseId) || null;

    const promiseNode = makeTreeItem(
      `Promise`,
      !promiseId && EmptyObject || [
        makeTreeItem(
          'PromiseLinks From',
          promiseLinksFrom,
          { description: makeArrayLengthLabel(promiseLinksFrom) }
        ),
        makeTreeItem(
          'PromiseLinks To',
          promiseLinksTo,
          { description: makeArrayLengthLabel(promiseLinksTo) }
        ),
        makeTreeItem(
          'Promise Updates',
          promiseUpdates?.map(this.makeAsyncUpdateItem),
          { description: makeArrayLengthLabel(promiseUpdates) }
        )
      ],
      {
        description: `promiseId=${promiseId}`
      }
    );

    /** ###########################################################################
     * Async Ancestor
     *  #########################################################################*/

    const nestingTraces = dp.util.getNestedAncestors(trace.rootContextId)
      .map((_traceId, i) => {
        const _trace = dp.collections.traces.getById(_traceId);
        return makeTreeItem(dp.util.makeTraceInfo(_trace), _trace, {
          description: `(traceId: ${_traceId})`,
          handleClick() {
            traceSelection.selectTrace(_trace);
          }
        });
      });

    const ancestorNode = makeTreeItem(
      `Ancestors`,
      nestingTraces,
      { description: `(${nestingTraces.length})` }
    );

    const asyncContainerNode = [
      'Async',
      [
        rootNode,
        promiseNode,
        ancestorNode,
      ],
      {
        // eslint-disable-next-line max-len
        description: `thread=${asyncNode?.threadId}`
      }
    ];

    // ###########################################################################
    // final result
    // ###########################################################################

    const children = [
      ...this.treeNodeProvider.buildDetailNodes(this.trace, this, [
        TraceTypeTDNode,
        ContextTDNode,
      ]),
      ...makeTreeItems(
        ['trace', otherTraceProps],
        valueNode,
        contextNode,
        rootContextNode,
        asyncContainerNode,
        ...allDataNodes,
        ['staticTrace', staticTrace],
        ['staticContext', staticContext],
        ['staticProgramContext', staticProgramContext]
      )
    ];

    return children;
  }
}
