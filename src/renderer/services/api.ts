import { definitions } from 'common/typings/api.gremio-steve.d.ts';
import AuthenticationStorage from '_/services/authentication.storage';

import { IApiService } from '_/../common/api/types';

import { createClient } from 'common/api/client';
import { createOperations } from 'common/api/operations';
import history from '_/services/history';
import Paths from '_/../common/api/paths';

/** This is a re-exported definition from common typings  */
export type Definitions = definitions;

const Client = createClient({
  baseURL: CONFIG.renderer.api.uri,
  withCredentials: true,
});

Client.computeAuthorizationHeaders = function () {
  const access_token = AuthenticationStorage.readToken();

  if (access_token) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return headers;
  }
  return {};
};

Client.removeAuthorizationHeaders = function () {
  delete this.defaults.headers.Authorization;
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
        const authentication = await ApiService.Operations.refreshToken();

        if (!authentication) {
          throw 'Refresh token expired';
        }

        AuthenticationStorage.writeToken(authentication.data.access_token);

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

/**
 * Api service that handles:
 * - API Operation calls
 * - Exposes API string paths
 * - Exposes a AxiosInstance as Client
 *
 * This service is strictly tied to the OpenAPI file (Swagger's json file at the moment) typification
 * that the `openapi-typescript` creates, if for some reason you are having any problem consuming the
 * API service try running `npm run generate:specs` in order to refresh the typings
 */
const ApiService: IApiService = {
  Paths: Paths,
  Operations: createOperations(Client),
  Client: Client,
};

export default ApiService;
