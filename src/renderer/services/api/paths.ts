import format from 'string-format';
import { IApiService } from './api';

const Paths: IApiService['Paths'] = {
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
  '/journeys/queue': () => '/journeys/queue',
  '/auth/refresh': () => '/auth/refresh',
};

export default Paths;
