import RuntimeDataProvider from './RuntimeDataProvider';
import dataProviderUtil from './dataProviderUtil';

import CallGraph from './callGraph/CallGraph';

import TracesByFileIndex from './impl/indexes/TracesByFileIndex';
import FirstTracesIndex from './impl/indexes/FirstTracesIndex';
import FirstContextsInRunsIndex from './impl/indexes/FirstContextsInRunsIndex';
import FirstContextsInRunsByThreadIndex from './impl/indexes/FirstContextsInRunsByThreadIndex';
import TracesByContextIndex from './impl/indexes/TracesByContextIndex';
import TracesByParentContextIndex from './impl/indexes/TracesByParentContextIndex';
import TracesByStaticTraceIndex from './impl/indexes/TracesByStaticTraceIndex';
import TracesByRunIndex from './impl/indexes/TracesByRunIndex';
import TracesByStaticContextIndex from './impl/indexes/TracesByStaticContextIndex';
import TracesByRefIdIndex from './impl/indexes/TracesByRefIdIndex';
import TracesByCalleeTraceIndex from './impl/indexes/TracesByCalleeTraceIndex';
import TracesByParentStaticContextIndex from './impl/indexes/TracesByParentStaticContextIndex';
import TracesByRealContextIndex from './impl/indexes/TracesByRealContextIndex';
import TracesByCallIndex from './impl/indexes/TracesByCallIndex';
import TracesBySpecialIdentifierTypeIndex from './impl/indexes/TracesBySpecialIdentifierTypeIndex';
import ErrorTracesIndex from './impl/indexes/ErrorTracesIndex';
import ErrorTracesByContextIndex from './impl/indexes/ErrorTracesByContextIndex';
import ErrorTracesByRunIndex from './impl/indexes/ErrorTracesByRunIndex';

import ContextChildrenIndex from './impl/indexes/ContextChildrenIndex';
import ContextsByStaticContextIndex from './impl/indexes/ContextsByStaticContextIndex';
import ContextsByRunIndex from './impl/indexes/ContextsByRunIndex';
import ContextsByCalleeTraceIndex from './impl/indexes/ContextsByCalleeTraceIndex';
import RootContextsByRunIndex from './impl/indexes/RootContextsByRunIndex';
import RootContextsIndex from './impl/indexes/RootContextsIndex';
import ExecutedStaticTracesByFileIndex from './impl/indexes/ExecutedStaticTracesByFileIndex';
import ParentTracesInRealContextIndex from './impl/indexes/ParentTracesInRealContextIndex';
import StaticContextsByFileIndex from './impl/indexes/StaticContextsByFileIndex';
import StaticContextsByParentIndex from './impl/indexes/StaticContextsByParentIndex';
import StaticTracesByContextIndex from './impl/indexes/StaticTracesByContextIndex';
import ContextsByTypeIndex from './impl/indexes/ContextsByTypeIndex';

import ProgramIdByFilePathQuery from './impl/queries/ProgramIdByFilePathQuery';
import ProgramFilePathByTraceIdQuery from './impl/queries/ProgramFilePathByTraceIdQuery';
import StatsByContextQuery from './impl/queries/StatsByContextQuery';
import DataNodesByTraceIndex from './impl/indexes/DataNodesByTraceIndex';
import DataNodesByAccessIdIndex from './impl/indexes/DataNodesByAccessIdIndex';
import DataNodesByValueIdIndex from './impl/indexes/DataNodesByValueIdIndex';
import DataNodesByRefIdIndex from './impl/indexes/DataNodesByRefIdIndex';
import DataNodesByObjectRefIdIndex from './impl/indexes/DataNodesByObjectRefIdIndex';
import AsyncEventsFromIndex from './impl/indexes/AsyncEventsFromIndex';
import AsyncEventsToIndex from './impl/indexes/AsyncEventsToIndex';
import SyncInAsyncEventsByRootIndex from './impl/indexes/SyncInAsyncEventsByRootIndex';
import SyncOutAsyncEventsByRootIndex from './impl/indexes/SyncOutAsyncEventsByRootIndex';
import AsyncNodesByRootIndex from './impl/indexes/AsyncNodesByRootIndex';
import AsyncNodesByThreadIndex from './impl/indexes/AsyncNodesByThreadIndex';
import AsyncEventUpdatesByNestedPromiseAndRunIndex from './impl/indexes/AsyncEventUpdatesByNestedPromiseAndRunIndex';
import AsyncEventUpdatesByTraceIndex from './impl/indexes/AsyncEventUpdatesByTraceIndex';
import PostAsyncEventUpdateByPromiseIndex from './impl/indexes/PostAsyncEventUpdateByPromiseIndex';
import AsyncEventUpdatesByRootIndex from './impl/indexes/AsyncEventUpdatesByRootIndex';
import AsyncEventUpdatesByNestedPromiseIndex from './impl/indexes/AsyncEventUpdatesByNestedPromiseIndex';


export function newDataProvider(application) {
  const dataProvider = new RuntimeDataProvider(application);

  // util
  const utilNames = Object.keys(dataProviderUtil);
  dataProvider.util = Object.fromEntries(
    utilNames.map(name => [name, dataProviderUtil[name].bind(null, dataProvider)])
  );

  // call graph
  dataProvider.callGraph = new CallGraph(dataProvider);

  // indexes
  dataProvider.addIndex(new StaticContextsByFileIndex());
  dataProvider.addIndex(new StaticContextsByParentIndex());
  dataProvider.addIndex(new StaticTracesByContextIndex());

  dataProvider.addIndex(new ContextsByStaticContextIndex());
  dataProvider.addIndex(new ContextsByRunIndex());
  dataProvider.addIndex(new ContextsByTypeIndex());
  dataProvider.addIndex(new ContextsByCalleeTraceIndex());
  dataProvider.addIndex(new ContextChildrenIndex());
  dataProvider.addIndex(new RootContextsByRunIndex());
  dataProvider.addIndex(new RootContextsIndex());
  dataProvider.addIndex(new FirstContextsInRunsIndex());
  dataProvider.addIndex(new FirstContextsInRunsByThreadIndex());

  dataProvider.addIndex(new FirstTracesIndex());
  dataProvider.addIndex(new TracesByFileIndex());
  dataProvider.addIndex(new TracesByContextIndex());
  dataProvider.addIndex(new TracesByParentContextIndex());
  dataProvider.addIndex(new TracesByCalleeTraceIndex());
  dataProvider.addIndex(new TracesByStaticTraceIndex());
  dataProvider.addIndex(new TracesByStaticContextIndex());
  dataProvider.addIndex(new TracesByParentStaticContextIndex());
  dataProvider.addIndex(new TracesByRunIndex());
  dataProvider.addIndex(new TracesByCallIndex());
  dataProvider.addIndex(new ErrorTracesIndex());
  dataProvider.addIndex(new ErrorTracesByContextIndex());
  dataProvider.addIndex(new ErrorTracesByRunIndex());

  dataProvider.addIndex(new TracesByRealContextIndex());
  dataProvider.addIndex(new TracesBySpecialIdentifierTypeIndex());

  // data + values
  dataProvider.addIndex(new TracesByRefIdIndex());
  dataProvider.addIndex(new DataNodesByTraceIndex());
  dataProvider.addIndex(new DataNodesByAccessIdIndex());
  dataProvider.addIndex(new DataNodesByValueIdIndex());
  dataProvider.addIndex(new DataNodesByRefIdIndex());
  dataProvider.addIndex(new DataNodesByObjectRefIdIndex());

  // complex indexes (that have dependencies)
  // NOTE: we are currently solving index dependencies by simply adding depdendents after dependees
  dataProvider.addIndex(new ExecutedStaticTracesByFileIndex());
  dataProvider.addIndex(new ParentTracesInRealContextIndex());

  // ########################################
  // async
  // ########################################

  dataProvider.addIndex(new AsyncEventsFromIndex());
  dataProvider.addIndex(new AsyncEventsToIndex());
  dataProvider.addIndex(new SyncInAsyncEventsByRootIndex());
  dataProvider.addIndex(new SyncOutAsyncEventsByRootIndex());
  dataProvider.addIndex(new AsyncNodesByRootIndex());
  dataProvider.addIndex(new AsyncNodesByThreadIndex());

  dataProvider.addIndex(new AsyncEventUpdatesByNestedPromiseIndex());
  dataProvider.addIndex(new AsyncEventUpdatesByNestedPromiseAndRunIndex());
  dataProvider.addIndex(new AsyncEventUpdatesByTraceIndex());
  dataProvider.addIndex(new AsyncEventUpdatesByRootIndex());
  dataProvider.addIndex(new PostAsyncEventUpdateByPromiseIndex());


  // queries
  dataProvider.addQuery(new ProgramIdByFilePathQuery());
  dataProvider.addQuery(new ProgramFilePathByTraceIdQuery());
  dataProvider.addQuery(new StatsByContextQuery());

  return dataProvider;
}
