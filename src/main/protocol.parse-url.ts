/**
 * Parse the URL that was delivered to this app to determine the
 * action that should be taken by the app.
 *
 * Based on file GitHub Desktop src file main.ts
 * See https://github.com/desktop/desktop/blob/development/app/src/main-process/main.ts
 */

import log from 'electron-log'; // https://www.npmjs.com/package/electron-log
import URL from 'url';
import querystring from 'query-string';

import ProtocolHandlers, { ActionPayload } from './protocol.actions';
import { Action } from '../common/protocol.actions';
import * as IpcEvents from '../common/ipc.events';

/**
 *
 * @param url received URL from event
 */
export function parseProtocolURL(url: string): ActionPayload | undefined {
  log.info(url);
  const knownActions = Object.values(Action);
  const parsedURL = URL.parse(url);
  const unknown = { name: IpcEvents.Renderer.unknown, payload: undefined };

  // Avoiding an injection attack: check that the query only includes expected characters
  // No characters other than #.-&=_ a-z A-Z 0-9 (no spaces)
  const cleanRegex = /^[.\-&=_ a-z A-Z 0-9]*/;

  if (cleanRegex.test(parsedURL.query) === false) {
    log.debug('query includes forbidden characters, ignoring');
    return unknown;
  }

  const { action, ...queryObject } = querystring.parse(parsedURL.query);

  let actionName: Action | undefined;
  // For future versions of Node, the WHATG version of URL is
  // recommended. But it's not ready for v12.20. Sigh.
  //
  // We also have the issue that a single slash should be used
  // for the URL (as recommended by RFC 8252 sec 7.1)
  // See https://tools.ietf.org/html/rfc8252#section-7.1)
  //
  // But a parsed single slash URL does not use the hostname, only the pathname,
  // whereas a parsed double slash uses the hostname attribute.
  const { pathname, hostname } = parsedURL;

  if (!pathname && !hostname) {
    log.debug('no pathname or hostname present');
    return unknown;
  }

  // determine actionName
  // Need to check the hostname and pathname due to single/double
  // slash issues.
  // N.B. Once we start using WHATG URL, only need to check the pathname
  //
  // InfoSec: these checks are not so secure since additional strings
  // could be added before or after the target string.
  // But checking the state value (done by the listener) provides the
  // necessary security against CSRF and other attacks
  if (pathname && knownActions.includes(action as Action)) {
    log.debug('pathname match, all good');
    actionName = action as Action;
  } else if (hostname && knownActions.includes(action as Action)) {
    log.debug('hostname match, all good');
    actionName = action as Action;
  }

  if (
    !actionName ||
    !Object.prototype.hasOwnProperty.call(ProtocolHandlers, actionName) // Check if we created a handler for this actionName
  ) {
    log.debug('Unknown action, skipping');
    return unknown; // EARLY RETURN
  }

  return ProtocolHandlers[actionName](queryObject);
}
