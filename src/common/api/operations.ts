import { AxiosRequestConfig } from 'axios';
import Paths from './paths';
import { ApiTypes } from './types';

export const createOperations = (
  Client: ApiTypes.Client.Instance,
  config: AxiosRequestConfig = {}
): ApiTypes.Operations.Requests => ({
  JourneysController_findAll: (parameters) => Client.get(Paths['/journeys']()),
  JourneysController_createOne: (parameters, body) =>
    Client.post(Paths['/journeys'](), body, {
      ...config,
    }),
  JourneysController_findOneById: (parameters) => Client.get(Paths['/journeys/:id'](parameters.path), { ...config }),
  AuthController_osuLoginCallback: (parameters) =>
    Client.get(Paths['/auth/osu/callback'](), {
      ...config,
      params: parameters.query,
    }),
  AuthController_osuLogin: () => {
    throw new Error('this method is supposed to be navigated to');
  },
  UsersController_search: () =>
    Client.get(Paths['/users'](), {
      ...config,
      params: {
        // search: parameters.query.search,
      },
    }),
  UsersController_getMyself: () => Client.get(Paths['/users/@me'](), { ...config }),
  UsersController_getOneById: (params) => Client.get(Paths['/users/{id}']({ id: params.path.id }), { ...config }),
  UsersController_addJourneyToMyQueue: (params) =>
    Client.post(Paths['/users/@me/queue/{journey_id}'](params.path.journey_id), {}, { ...config }),
  UsersController_removeJourneyFromMyQueue: (params) =>
    Client.delete(Paths['/users/@me/queue/{journey_id}'](params.path), {
      ...config,
    }),
  UsersController_getMyActivityFeed: () => Client.get(Paths['/users/@me/activity-feed'](), { ...config }),
  UsersController_getMyQueue: () => Client.get(Paths['/users/@me/queue'](), { ...config }),
  UsersController_getUserActivity: (params) => Client.get(Paths['/users/{id}/activity'](params.path)),
  UsersController_updateOneById: (params) => Client.get(Paths['/users/{id}'](params.path)),
});
