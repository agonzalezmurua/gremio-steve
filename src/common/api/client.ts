import Axios, { AxiosRequestConfig } from 'axios';
import { createOperations } from './operations';
import { ApiTypes } from './types';

export const createClient = (config: AxiosRequestConfig) => {
  const Client = Axios.create(config) as ApiTypes.Client.Instance;
  const operations = function (config) {
    return createOperations(Client, config);
  };

  Object.entries(createOperations(Client)).forEach(([key, handler]) => {
    operations[key] = handler;
  });

  //@ts-ignore
  Client.operations = operations;
  Client.cancelToken = Axios.CancelToken;
  return Client;
};
