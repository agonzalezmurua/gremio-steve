import endpoints from './__endpoints';
import axios from 'axios';

const api = {
  searchJourneys(searchTerm: string) {
    return axios.get<Journey[]>(endpoints.beatmaps.search(searchTerm));
  },
};

export default api;
