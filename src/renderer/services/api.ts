import Axios from 'axios';
import format from 'string-format';
import { OperationRequest } from '@/typings/api';
import {
  operations,
  paths,
  definitions,
} from 'common/typings/api.gremio-steve.d.ts';

export type Definitions = definitions;

Axios.defaults.baseURL = CONFIG.renderer.api.uri;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Paths: Record<keyof paths, (params?: any) => string> = {
  '/auth/osu': () => '/auth/osu',
  '/auth/osu/callback': () => '/auth/osu/callback',
  '/journeys': () => '/journeys',
  '/journeys/:id': (parameters: { id: string }) => {
    return format('/journeys/{id}', parameters);
  },
  '/journeys/mine': () => '/journeys/mine',
  '/users': () => '/users',
  '/users/:id': (parameters: { id: string }) =>
    format('/users/{id}', parameters),
  '/users/myself': () => '/users/myself',
};

const Operations: {
  [key in keyof operations]: OperationRequest<operations[key]>;
} = {
  searchJourneys: (parameters) =>
    Axios.get('/', {
      params: {
        search: parameters.query.search,
      },
    }),
  createOneJourney: (parameters) =>
    Axios.post(Paths['/journeys'](), parameters.body),
  deleteOneJourneyById: (parameters) =>
    Axios.delete(Paths['/journeys/:id'](parameters.path.id)),
  getMyJourneys: () => Axios.get(Paths['/journeys/mine']()),
  getOneJourneyById: (parameters) =>
    Axios.get(Paths['/journeys/:id'](parameters.path)),
  searchUsers: (parameters) =>
    Axios.get(Paths['/users'](), {
      params: {
        search: parameters.query.search,
      },
    }),
  authenticateUser: (parameters) =>
    Axios.post(Paths['/auth/osu/callback'](), parameters.body),
  requestAuthorization: () => {
    throw new Error('this methos is not supposed to be navigated to');
  },
  getMyUser: () => Axios.get(Paths['/users/myself']()),
  getOneUserById: (parameters) =>
    Axios.get(Paths['/users/:id']({ id: parameters.path.id })),
};

export default {
  Paths,
  Operations,
  Client: Axios,
};
