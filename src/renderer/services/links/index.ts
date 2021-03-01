import journeys from './journeys';
import user from './user';
import querystring from 'query-string';
import { Action as ProtocolActions } from '_/../common/protocol.actions';
import * as IpcEvents from 'common/ipc.events';

/**
 * Creates a URL that will be handled by the app's main process
 * @param action
 * @param query
 */
function composeAppUrl(action: ProtocolActions, query: Record<string, any>) {
  const protocol = CONFIG.main.protocol;
  const parameters = querystring.stringify({
    action: action,
    ...query,
  });
  return `${protocol}://?${parameters}`;
}

export default {
  journeys,
  user,
  pages: {
    home: () => '/',
    auth_osu_callback: (query: { code: string; state?: string }) =>
      `/auth/osu/callback?${querystring.stringify(query)}`,
    not_found: () => '/not-found',
    error_500: () => '/error/500',
    error_400: () => '/error/400',
    login: () => '/login',
  },
  /** Main process related links */
  app: {
    /** URL's that are meant to be used by the app, redirects the app to the web's instance */
    open_web: {
      login: () =>
        `${CONFIG.renderer.web.login}?${querystring.stringify({
          referer: 'app',
        })}`,
    },
    /** URL's that are meant to be used by the web, and handled by the app */
    protocol: {
      /** Sends the app the code in order to handle the rest of the authentication process */
      authenticate: (parameters: IpcEvents.Renderer.Payloads.Authentication) =>
        composeAppUrl(ProtocolActions.authenticate, parameters),
    },
  },
};
