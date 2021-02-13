import { AxiosResponse } from 'axios';

export interface Operation {
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
  params: O['parameters']
) => Promise<OperationResponse<O>>;
