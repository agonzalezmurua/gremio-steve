import Axios, { AxiosRequestConfig } from 'axios';
import { createOperations } from './operations';
import { ApiTypes } from './types';

export const createClient = (config: AxiosRequestConfig) => {
  const Client = Axios.create(config) as ApiTypes.Service.Client;

  Client.operations = (config) => createOperations(Client, config);
  Client.cancelToken = Axios.CancelToken;
  return Client;
};
