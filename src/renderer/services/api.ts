import Axios, { AxiosInstance } from 'axios';
import format from 'string-format';
import { OperationRequest } from '@/typings/api';
import {
  operations,
  paths,
  definitions,
} from 'common/typings/api.gremio-steve.d.ts';

/** This is a re-exported definition from common typings  */
export type Definitions = definitions;

const Client = Axios.create({
  baseURL: CONFIG.renderer.api.uri,
});

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
  },
  // TODO: Handle 403 responses to either redirect or wait for the refresh token implementation so
  // we han handle retries
  Operations: {
    searchJourneys: (parameters) =>
      Axios.get('/', {
        params: {
          search: parameters.query.search,
        },
      }),
    createOneJourney: (parameters) =>
      Axios.post(ApiService.Paths['/journeys'](), parameters.body),
    deleteOneJourneyById: (parameters) =>
      Axios.delete(ApiService.Paths['/journeys/:id'](parameters.path.id)),
    getMyJourneys: () => Axios.get(ApiService.Paths['/journeys/mine']()),
    getOneJourneyById: (parameters) =>
      Axios.get(ApiService.Paths['/journeys/:id'](parameters.path)),
    searchUsers: (parameters) =>
      Axios.get(ApiService.Paths['/users'](), {
        params: {
          search: parameters.query.search,
        },
      }),
    authenticateUser: (parameters) =>
      Axios.post(ApiService.Paths['/auth/osu/callback'](), parameters.body),
    requestAuthorization: () => {
      throw new Error('this methos is not supposed to be navigated to');
    },
    getMyUser: () => Axios.get(ApiService.Paths['/users/myself']()),
    getOneUserById: (parameters) =>
      Axios.get(ApiService.Paths['/users/:id']({ id: parameters.path.id })),
  },
  Client: Client,
};

export default ApiService;
