import { AxiosResponse } from 'axios';

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

export type OperationRequest<
  O extends Operation
> = O['parameters'] extends undefined
  ? () => Promise<OperationResponse<O>>
  : (params: O['parameters']) => Promise<OperationResponse<O>>;
