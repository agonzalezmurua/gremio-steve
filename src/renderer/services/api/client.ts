import Axios, { AxiosInstance } from 'axios';

interface ClientInstance extends AxiosInstance {
  setAuthorizationHeaders: (access_token: string) => void;
  removeAuthorizationHeaders: () => void;
}
const Client = Axios.create({
  baseURL: CONFIG.renderer.api.uri,
}) as ClientInstance;

Client.setAuthorizationHeaders = function (access_token?: string) {
  if (access_token) {
    this.defaults.headers.Authorization = `Bearer ${access_token}`;
  }
};

Client.removeAuthorizationHeaders = function () {
  delete this.defaults.headers.Authorization;
};

export default Client;
