import { definitions } from '../common/typings/api.gremio-steve';
import * as IpcEvents from '../common/ipc.events';
import * as Protocol from '../common/protocol.actions';

export type ActionPayload<T = unknown> = {
  /** Renderer event to call */
  name: IpcEvents.Renderer.Events;
  payload: T;
};

type ActionHandler = (params?: any) => ActionPayload;

/**
 * Mapped Actions that are received from a URL call from the app
 *
 * They receive the parsed parameters on the URL and send a event to the ipcRenderer
 * and optionally do something execute something on the Main process
 *
 * Either way they **always** must return an `ActionPayload` object for the renderer
 */
const ProtocolHandlers: { [keys in Protocol.Action]: ActionHandler } = {
  authenticate: (
    params: IpcEvents.Renderer.Payloads.Authentication
  ): ActionPayload => {
    return {
      name: IpcEvents.Renderer.Events.authenticate,
      payload: {
        code: params.code,
      },
    };
  },
};

export default ProtocolHandlers;
