import axios, { AxiosResponse } from 'axios';
import { operations, definitions } from '_typings/api.gremio-steve';

axios.defaults.baseURL = CONFIG.app.api.uri;

type JourneyOperations = {
  search: (
    parameters: operations['searchJourneys']['parameters']
  ) => Promise<AxiosResponse<Array<definitions['Journey']>>>;
};

const api: {
  journeys: JourneyOperations;
} = {
  journeys: {
    search: (params) => {
      return axios.get<Array<definitions['Journey']>>(`/journeys`, {
        params: params.query,
      });
    },
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
