import {
  window
} from 'vscode';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import { newLogger } from '@dbux/common/src/log/logger';

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('Notifications');

/**
 * @example Render a modal with one button "Open Editor":
```
showInformationMessage(value, {
  async 'Open Editor'() {
    const doc = await workspace.openTextDocument({ content: value });
    await window.showTextDocument(doc.uri);
  }
}, { modal: true });
```
 */
export async function showInformationMessage(message, btnConfig, messageCfg = EmptyObject, cancelCallback) {
  btnConfig = btnConfig || EmptyObject;
  const buttons = Object.keys(btnConfig);
  if (messageCfg?.modal && process.platform === 'darwin') {
    // for some reason, on MAC, modal buttons are reversed :(
    buttons.reverse();
  }
  message = `[Dbux] ${message}`;
  debug(message);
  const result = await window.showInformationMessage(message, messageCfg, ...buttons);
  if (result === undefined) {
    return await cancelCallback?.();
  }
  const cbResult = await btnConfig[result]?.();
  return cbResult === undefined ? null : cbResult;
}

export async function showWarningMessage(message, btnConfig, messageCfg = EmptyObject, cancelCallback) {
  btnConfig = btnConfig || EmptyObject;
  message = `[Dbux] ${message}`;
  warn(message);
  const result = await window.showWarningMessage(message, messageCfg, ...Object.keys(btnConfig || EmptyObject));
  if (result === undefined) {
    await cancelCallback?.();
    return null;
  }
  const cbResult = await btnConfig[result]?.();
  return cbResult === undefined ? null : cbResult;
}

export async function showErrorMessage(message, btnConfig, messageCfg = EmptyObject, moreConfig = EmptyObject) {
  btnConfig = btnConfig || EmptyObject;
  const prefix = moreConfig.noPrefix ? '' : '[Dbux] ';
  btnConfig = btnConfig || EmptyObject;

  // IMPORTANT: don't log explicitely, since that is already hooked up to call this instead!
  //    -> if we called logError(), we would get an inf loop.

  const result = await window.showErrorMessage(`${prefix}${message}`, messageCfg, ...Object.keys(btnConfig));
  const cbResult = await btnConfig[result]?.();
  return cbResult === undefined ? null : cbResult;
}

/**
 * @param {string} msg 
 * @param {boolean} [modal] 
 * @returns {Promise<boolean|null>} A boolean indicates the result of confirmation, or null if it is canceled.
 */
export async function confirm(msg, modal = true, throwOnCancel = false) {
  // TOTRANSLATE
  const confirmText = 'Yes';
  const refuseText = 'No';

  const btnConfig = Object.fromEntries([confirmText, refuseText].map(t => [t, () => t]));
  const result = await showInformationMessage(msg, btnConfig, { modal });
  if (result === undefined) {
    if (throwOnCancel) {
      throw new Error('Modal cancelled.');
    }
    return null;
  }
  else {
    return result === confirmText;
  }
}
