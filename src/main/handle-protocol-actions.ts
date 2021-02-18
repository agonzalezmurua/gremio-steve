import { definitions } from '../common/typings/api.gremio-steve';

export enum Action {
  authenticate = 'authenticate',
}

export type ActionReturn = { name: string; payload: unknown };

type ActionHandler = (params?: any) => ActionReturn;

const handleProtocolActions: { [keys in Action]: ActionHandler } = {
  authenticate: (
    params: definitions['Authentication.Response']
  ): ActionReturn => {
    return {
      name: 'authenticate',
      payload: {
        ...params,
      },
    };
  },
};

export default handleProtocolActions;
