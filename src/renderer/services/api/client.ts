import Axios from 'axios';
import AuthenticationStorage from '../authentication.storage';
import { IApiService } from './api';

const Client = Axios.create({
  baseURL: CONFIG.renderer.api.uri,
  withCredentials: true,
}) as IApiService['Client'];

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
