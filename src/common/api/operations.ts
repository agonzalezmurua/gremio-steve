import { AxiosRequestConfig } from 'axios';
import { ClientInstance } from './client';
import Paths from './paths';
import { IApiService } from './types';

export const createOperations = (
  Client: ClientInstance,
  config: AxiosRequestConfig = {}
): IApiService['Operations'] => ({
  searchJourneys: (parameters) =>
    Client.get(Paths['/journeys'](), {
      ...config,
      params: {
        search: parameters.query.search,
      },
    }),
  createOneJourney: (parameters) =>
    Client.post(Paths['/journeys'](), parameters.body, { ...config }),
  deleteOneJourneyById: (parameters) =>
    Client.delete(Paths['/journeys/:id'](parameters.path.id), { ...config }),
  getMyJourneys: (parameters) =>
    Client.get(Paths['/journeys/mine'](), {
      ...config,
      params: parameters.query,
    }),
  getOneJourneyById: (parameters) =>
    Client.get(Paths['/journeys/:id'](parameters.path), { ...config }),
  searchUsers: (parameters) =>
    Client.get(Paths['/users'](), {
      ...config,
      params: {
        search: parameters.query.search,
      },
    }),
  authenticateUser: (parameters) =>
    Client.post(Paths['/auth/osu/callback'](), parameters.body, { ...config }),
  redirectToOsuOauth: () => {
    throw new Error('this methos is not supposed to be navigated to');
  },
  getMyUser: () => Client.get(Paths['/users/myself'](), { ...config }),
  getOneUserById: (parameters) =>
    Client.get(Paths['/users/:id']({ id: parameters.path.id }), { ...config }),
  getMyQueue: () => Client.get(Paths['/journeys/queue'](), { ...config }),
  refreshToken: () => Client.get(Paths['/auth/refresh'](), { ...config }),
});
