import { AxiosInstance } from 'axios';
import { OperationRequest } from '@/typings/api';
import { operations, paths } from 'common/typings/api.gremio-steve.d.ts';

interface ClientInstance extends AxiosInstance {
  /**
   * @returns Extended headers
   */
  computeAuthorizationHeaders: () => object;
  removeAuthorizationHeaders: () => void;
}

export interface IApiService {
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
  Client: ClientInstance;
}
