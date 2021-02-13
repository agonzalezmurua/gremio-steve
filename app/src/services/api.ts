import Axios from 'axios';
import { OperationRequest } from '_typings/api';
import { operations } from '_typings/api.gremio-steve';

Axios.defaults.baseURL = CONFIG.app.api.uri;

const api: {
  [key in keyof operations]: OperationRequest<operations[key]>;
} = {
  searchJourneys: (parameters) =>
    Axios.get('/', {
      params: {
        search: parameters.query.search,
      },
    }),
  createOneJourney: (parameters) => Axios.post('/journeys', parameters.body),
  deleteOneJourneyById: (parameters) =>
    Axios.delete(`/journeys/${parameters.path.id}`),
  getMyJourneys: () => Axios.get('/journeys/mine'),
  getOneJourneyById: (parameters) =>
    Axios.get(`/journeys/${parameters.path.id}`),
  searchUsers: (parameters) =>
    Axios.get('/users', {
      params: {
        search: parameters.query.search,
      },
    }),
};

export default api;
