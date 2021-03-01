import format from 'string-format';
import queryString from 'query-string';
import { IApiService } from './types';

const Paths: IApiService['Paths'] = {
  '/auth/osu': (parameters: { state: string }) =>
    '/auth/osu?' + queryString.stringify(parameters),
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
  '/journeys/queue': () => '/journeys/queue',
  '/auth/refresh': () => '/auth/refresh',
};

export default Paths;
