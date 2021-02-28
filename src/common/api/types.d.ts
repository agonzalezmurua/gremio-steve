import { AxiosResponse } from 'axios';
import { operations, paths } from '../typings/api.gremio-steve';
import { ClientInstance } from './client';

interface Operation {
  parameters?: unknown;
  responses: {
    [key: number]:
      | {
          schema: unknown;
        }
      | unknown;
  };
}

export type OperationResponse<O extends Operation> = AxiosResponse<
  O['responses'] extends { 200: { schema: unknown } }
    ? O['responses'][200]['schema']
    : void
> & {
  status: keyof O['responses'];
};

export type OperationRequest<O extends Operation> = (
  params?: O['parameters']
) => Promise<OperationResponse<O>>;

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
