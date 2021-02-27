import Axios, { AxiosInstance } from 'axios';
import AuthenticationStorage from '../authentication.storage';

interface ClientInstance extends AxiosInstance {
  /**
   * @returns Extended headers
   */
  computeAuthorizationHeaders: () => object;
  removeAuthorizationHeaders: () => void;
}

const Client = Axios.create({
  baseURL: CONFIG.renderer.api.uri,
  withCredentials: true,
}) as ClientInstance;

Client.computeAuthorizationHeaders = function () {
  const access_token = AuthenticationStorage.read();

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

export default Client;
