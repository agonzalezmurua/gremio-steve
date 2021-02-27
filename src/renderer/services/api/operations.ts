import ApiService from '.';
import { IApiService } from './api';
import Client from './client';

const Operations: IApiService['Operations'] = {
  searchJourneys: (parameters) =>
    Client.get('/', {
      params: {
        search: parameters.query.search,
      },
    }),
  createOneJourney: (parameters) =>
    Client.post(ApiService.Paths['/journeys'](), parameters.body),
  deleteOneJourneyById: (parameters) =>
    Client.delete(ApiService.Paths['/journeys/:id'](parameters.path.id)),
  getMyJourneys: (parameters) =>
    Client.get(ApiService.Paths['/journeys/mine'](), {
      params: parameters.query,
    }),
  getOneJourneyById: (parameters) =>
    Client.get(ApiService.Paths['/journeys/:id'](parameters.path)),
  searchUsers: (parameters) =>
    Client.get(ApiService.Paths['/users'](), {
      params: {
        search: parameters.query.search,
      },
    }),
  authenticateUser: (parameters) =>
    Client.post(ApiService.Paths['/auth/osu/callback'](), parameters.body),
  requestAuthorization: () => {
    throw new Error('this methos is not supposed to be navigated to');
  },
  getMyUser: () => Client.get(ApiService.Paths['/users/myself']()),
  getOneUserById: (parameters) =>
    Client.get(ApiService.Paths['/users/:id']({ id: parameters.path.id })),
  getMyQueue: () => Client.get(ApiService.Paths['/journeys/queue']()),
  refreshToken: () => Client.get(ApiService.Paths['/auth/refresh']()),
};

export default Operations;
