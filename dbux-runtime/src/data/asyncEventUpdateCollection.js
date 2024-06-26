// import '@dbux/common/src/types/AsyncEventUpdate';
import { PreAwaitUpdate, PostAwaitUpdate, PreThenUpdate, PostThenUpdate } from '@dbux/common/src/types/AsyncEventUpdate';
import AsyncEventUpdateType from '@dbux/common/src/types/constants/AsyncEventUpdateType';
import Collection from './Collection';

/** @typedef { import("@dbux/common/src/types/AsyncEventUpdate").AsyncEventUpdate } AsyncEventUpdate */


export class AsyncEventUpdateCollection extends Collection {
  lastPostUpdate;

  constructor() {
    super('asyncEventUpdates');
  }

  _addUpdate(upd) {
    upd.updateId = this._all.length;
    this.push(upd);
    this._send(upd);
  }

  /**
   * @return {PreAwaitUpdate}
   */
  addPreAwaitUpdate(upd) {
    upd.type = AsyncEventUpdateType.PreAwait;
    this._addUpdate(upd);
    return upd;
  }

  /**
   * @return {PostAwaitUpdate}
   */
  addPostAwaitUpdate(upd) {
    upd.type = AsyncEventUpdateType.PostAwait;
    this._addUpdate(upd);
    this.lastPostUpdate = upd;
    return upd;
  }

  /**
   * @return {PreThenUpdate}
   */
  addPreThenUpdate(upd) {
    upd.type = AsyncEventUpdateType.PreThen;
    this._addUpdate(upd);
    return upd;
  }

  /**
   * @return {PostThenUpdate}
   */
  addPostThenUpdate(upd) {
    upd.type = AsyncEventUpdateType.PostThen;
    this._addUpdate(upd);
    this.lastPostUpdate = upd;
    return upd;
  }

  /**
   * @return {PreCallbackUpdate}
   */
  addPreCallbackUpdate(upd) {
    upd.type = AsyncEventUpdateType.PreCallback;
    this._addUpdate(upd);
    return upd;
  }

  /**
   * @return {PostCallbackUpdate}
   */
  addPostCallbackUpdate(upd) {
    upd.type = AsyncEventUpdateType.PostCallback;
    this._addUpdate(upd);
    this.lastPostUpdate = upd;
    return upd;
  }

  addResolveUpdate(upd) {
    upd.type = AsyncEventUpdateType.Resolve;
    this._addUpdate(upd);
    return upd;
  }

  getLastPostUpdate() {
    return this.lastPostUpdate;
  }
}

const asyncEventUpdateCollection = new AsyncEventUpdateCollection();

export default asyncEventUpdateCollection;