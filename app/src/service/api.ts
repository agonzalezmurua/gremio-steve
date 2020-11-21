import endpoints from "./__endpoints";
import axios from 'axios';

const api = {
  searchBeatmap(searchTerm: string): Promise<Array<any>> {
    return axios.get(endpoints.beatmaps.search(searchTerm));
  },
};

export default api;
