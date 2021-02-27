import { definitions } from 'common/typings/api.gremio-steve.d.ts';
import AuthenticationStorage from '@/services/authentication.storage';

import { IApiService } from './api';

import Client from '@/services/api/client';
import history from '@/services/history';
import Paths from '@/services/api/paths';
import Operations from '@/services/api/operations';

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
const ApiService: IApiService = {
  Paths: Paths,
  Operations: Operations,
  Client: Client,
};

///
/// Initialization of client interceptors to handle authorization
///

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
