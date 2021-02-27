import { AxiosInstance } from 'axios';
import format from 'string-format';
import { OperationRequest } from '@/typings/api';
import {
  operations,
  paths,
  definitions,
} from 'common/typings/api.gremio-steve.d.ts';
import AuthenticationStorage from '@/services/authentication.storage';

import Client from './client';
import history from '../history';
import consolaGlobalInstance from 'consola';

/** This is a re-exported definition from common typings  */
export type Definitions = definitions;

/**
 * Api service that handles:
 * - API Operation calls
 * - TODO: Invalid Authentication redirects (maybe?)
 * - Exposes API string paths
 * - Exposes a AxiosInstance as Client
 *
 * This service is strictly tied to the OpenAPI file (Swagger's json file at the moment) typification
 * that the `openapi-typescript` creates, if for some reason you are having any problem consuming the
 * API service try running `npm run generate:specs` in order to refresh the typings
 */
interface IApiService {
  /**
   * functions that create a parametrized paths for API consumption
   *
   * This implementation was rushed so any attempt to make this any cleaner will be highly appreciated
   */
  Paths: Record<keyof paths, (params?: any) => string>;
  /**
   * Promises that invoke the API service, parameters, and response are defined from the API typings
   */
  Operations: {
    [key in keyof operations]: OperationRequest<operations[key]>;
  };
  /** Axios client instance, prefer using Operations unless there this a edge case that needs this specific instance */
  Client: AxiosInstance;
}

const ApiService: IApiService = {
  Paths: {
    '/auth/osu': () => '/auth/osu',
    '/auth/osu/callback': () => '/auth/osu/callback',
    '/journeys': () => '/journeys',
    '/journeys/:id': (parameters: { id: string }) => {
      return format('/journeys/{id}', parameters);
    },
    '/journeys/mine': () => '/journeys/mine',
    '/users': () => '/users',
    '/users/:id': (parameters: { id: string }) =>
      format('/users/{id}', parameters),
    '/users/myself': () => '/users/myself',
    '/journeys/queue': () => '/journeys/queue',
    '/auth/refresh': () => '/auth/refresh',
  },
  // TODO: Handle 403 responses to either redirect or wait for the refresh token implementation so
  // we han handle retries
  Operations: {
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
  },
  Client: Client,
};

Client.interceptors.request.use((config) => {
  config.headers = {
    ...(config.headers || {}),
    ...Client.computeAuthorizationHeaders(),
  };
  return config;
});

Client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if JWT is expired when tried to access a protected resource
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const authentication = await await ApiService.Operations.refreshToken();

        if (!authentication) {
          throw 'Refresh token expired';
        }

        AuthenticationStorage.write(authentication.data.access_token);

        return Client(originalRequest);
      } catch (error) {
        history.push('/login', { referer: history.location });
      }
    } else {
      // Continue normal rejection flow
      return Promise.reject(error);
    }
  }
);

export default ApiService;
