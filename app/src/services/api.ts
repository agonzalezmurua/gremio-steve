import endpoints from './__endpoints';
import axios from 'axios';

const api = {
  journeys: {
    search(searchTerm: string) {
      return axios.get<Journey[]>(endpoints.journeys.search(searchTerm));
    },
    getById(id: string) {
      return axios.get<Journey>(endpoints.journeys.byId(id));
    },
  },
};

export default api;
