import axios from 'axios';

axios.defaults.baseURL = CONFIG.app.api.uri;

const api = {
  journeys: {
    search(search: string) {
      return axios.get<Journey[]>(`/journeys`, {
        params: {
          search: search,
        },
      });
    },
    getById(id: string) {
      return axios.get<Journey>(`/journeys/${id}`);
    },
  },
  user: {
    profile(id: string) {
      return axios.get<User>(`/user/${id}`);
    },
    queue(id: string) {
      return axios.get<Journey[]>(`/user/${id}/queue`);
    },
    activity(id: string) {
      return axios.get<UserActivity[]>(`/user/${id}/activity`);
    },
  },
};

export default api;
