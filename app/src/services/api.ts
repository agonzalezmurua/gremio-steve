import axios, { AxiosResponse } from 'axios';
import { paths, operations, definitions } from '_typings/api.gremio-steve';

axios.defaults.baseURL = CONFIG.app.api.uri;

type Operation = {
  parameters: unknown;
  responses: {
    200: {
      schema: unknown;
    };
  };
};

type OperationRequest<O extends Operation> = (
  params: O['parameters']
) => Promise<AxiosResponse<O['responses'][200]>>;

const api = {
  journeys: {
    search: search,
  },
  // journeys: {
  //   search(search: string) {
  //     return axios.get<Journey[]>(`/journeys`, {
  //       params: {
  //         search: search,
  //       },
  //     });
  //   },
  //   getById(id: string) {
  //     return axios.get<Journey>(`/journeys/${id}`);
  //   },
  // },
  // user: {
  //   profile(id: string) {
  //     return axios.get<User>(`/user/${id}`);
  //   },
  //   queue(id: string) {
  //     return axios.get<Journey[]>(`/user/${id}/queue`);
  //   },
  //   activity(id: string) {
  //     return axios.get<UserActivity[]>(`/user/${id}/activity`);
  //   },
  // },
};

export default api;
