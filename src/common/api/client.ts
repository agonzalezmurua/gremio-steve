import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IApiService } from './types';

export interface ClientInstance extends AxiosInstance {
  /**
   * @returns Extended headers
   */
  computeAuthorizationHeaders: () => object;
  removeAuthorizationHeaders: () => void;
}

export const createClient = (config: AxiosRequestConfig) =>
  Axios.create(config) as IApiService['Client'];
