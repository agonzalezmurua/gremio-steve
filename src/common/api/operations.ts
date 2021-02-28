import { ClientInstance } from './client';
import Paths from './paths';
import { IApiService } from './types';

export const createOperations = (
  Client: ClientInstance
): IApiService['Operations'] => ({
  issueAppAuthentication: () => Client.get(Paths['/auth/app']()),
  searchJourneys: (parameters) =>
    Client.get('/', {
      params: {
        search: parameters.query.search,
      },
    }),
  createOneJourney: (parameters) =>
    Client.post(Paths['/journeys'](), parameters.body),
  deleteOneJourneyById: (parameters) =>
    Client.delete(Paths['/journeys/:id'](parameters.path.id)),
  getMyJourneys: (parameters) =>
    Client.get(Paths['/journeys/mine'](), {
      params: parameters.query,
    }),
  getOneJourneyById: (parameters) =>
    Client.get(Paths['/journeys/:id'](parameters.path)),
  searchUsers: (parameters) =>
    Client.get(Paths['/users'](), {
      params: {
        search: parameters.query.search,
      },
    }),
  authenticateUser: (parameters) =>
    Client.post(Paths['/auth/osu/callback'](), parameters.body),
  redirectToOsuOauth: () => {
    throw new Error('this methos is not supposed to be navigated to');
  },
  getMyUser: () => Client.get(Paths['/users/myself']()),
  getOneUserById: (parameters) =>
    Client.get(Paths['/users/:id']({ id: parameters.path.id })),
  getMyQueue: () => Client.get(Paths['/journeys/queue']()),
  refreshToken: () => Client.get(Paths['/auth/refresh']()),
});
