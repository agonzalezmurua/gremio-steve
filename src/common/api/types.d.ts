import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenStatic,
} from 'axios';
import {
  operations as ApiOperations,
  paths,
} from '../typings/api.gremio-steve';

declare namespace ApiTypes {
  namespace Client {
    export interface Instance extends AxiosInstance {
      /**
       * @returns Extended headers
       */
      computeAuthorizationHeaders: () => object;
      removeAuthorizationHeaders: () => void;
      /**
       * Promises that invoke the API service, parameters, and response are defined from the API typings
       */
      operations: Operations.Requests &
        ((config?: AxiosRequestConfig) => Operations.Requests);
      cancelToken: CancelTokenStatic;
    }
  }
  namespace Service {
    /**
     * functions that create a parametrized paths for API consumption
     *
     * This implementation was rushed so any attempt to make this any cleaner will be highly appreciated
     */
    export type Paths = Record<keyof paths, (params?: any) => string>;
    /** Axios client instance, prefer using Operations unless there this a edge case that needs this specific instance */
    export type Client = Client.Instance;
  }
  namespace Operations {
    type Definitions = ApiOperations;

    type Requests = {
      [key in Names]: Base.Request<ApiOperations[key]>;
    };

    type Names = keyof ApiOperations;
    namespace Base {
      interface Structure {
        parameters?: unknown;
        responses: {
          [key: number]:
            | {
                content: {
                  ['application/json']: unknown;
                };
              }
            | unknown;
        };
        requestBody?: {
          content: {
            ['application/json']: unknown;
          };
        };
      }

      export type Response<Operation extends Structure> = AxiosResponse<
        Operation['responses'] extends {
          200: { content: { ['application/json']: unknown } };
        }
          ? Operation['responses'][200]['content']['application/json']
          : void
      > & {
        status: keyof Operation['responses'];
      };

      export type Request<Operation extends Structure = Structure> = (
        params?: Operation['parameters'],
        body?: Operation['requestBody']['content']['application/json']
      ) => Promise<Response<Operation>>;
    }
  }
}
