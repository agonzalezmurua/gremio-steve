import { definitions } from '../common/typings/api.gremio-steve';
import * as IpcEvents from '../common/ipc.events';
import * as Protocol from '../common/protocol.actions';

export type ActionPayload = { name: IpcEvents.Renderer; payload: unknown };

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
    params: definitions['Authentication.Response']
  ): ActionPayload => {
    return {
      name: IpcEvents.Renderer.authenticate_user,
      payload: {
        ...params,
      },
    };
  },
};

export default ProtocolHandlers;
