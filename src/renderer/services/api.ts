import { ApiTypes } from 'common/api/types';
import { createClient } from 'common/api/client';
import Paths from 'common/api/paths';

import AuthenticationStorage from '_/services/authentication.storage';

// import history from '_/services/history';

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

// Client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     // Check if JWT is expired when tried to access a protected resource
//     if (error.response.status === 401 && !originalRequest._retry) {
//       try {
//         originalRequest._retry = true;
//         const authentication = await Api.Client.operations().refreshToken();

//         if (!authentication) {
//           throw 'Refresh token expired';
//         }

//         AuthenticationStorage.writeToken(authentication.data.access_token);

//         return Client(originalRequest);
//       } catch (error) {
//         history.push('/login', { referer: history.location });
//       }
//     } else {
//       // Continue normal rejection flow
//       return Promise.reject(error);
//     }
//   }
// );

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
const Api: {
  Paths: ApiTypes.Service.Paths;
  Client: ApiTypes.Service.Client;
} = {
  Paths: Paths,
  Client: Client,
};

export default Api;
