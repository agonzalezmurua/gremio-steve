import { definitions } from '../common/typings/api.gremio-steve';
import * as IpcEvents from '../common/ipc.events';
import * as Protocol from '../common/protocol.actions';

export type ActionReturn = { name: IpcEvents.Renderer; payload: unknown };

type ActionHandler = (params?: any) => ActionReturn;

const handleProtocolActions: { [keys in Protocol.Action]: ActionHandler } = {
  authenticate: (
    params: definitions['Authentication.Response']
  ): ActionReturn => {
    return {
      name: IpcEvents.Renderer.authenticate_user,
      payload: {
        ...params,
      },
    };
  },
};

export default handleProtocolActions;
