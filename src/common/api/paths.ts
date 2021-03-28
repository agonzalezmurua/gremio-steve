import format from 'string-format';
import queryString from 'query-string';
import { ApiTypes } from './types';

const Paths: ApiTypes.Service.Paths = {
  '/auth/osu': (parameters: { state: string }) =>
    '/auth/osu?' + queryString.stringify(parameters),
  '/auth/osu/callback': () => '/auth/osu/callback',
  '/journeys': () => '/journeys',
  '/journeys/{id}': (parameters: { id: number }) => {
    return format('/journeys/{id}', parameters);
  },
  // '/journeys/mine': () => '/journeys/mine',
  '/users': () => '/users',
  '/users/{id}': (parameters: { id: number }) =>
    format('/users/{id}', parameters),
  '/users/@me': () => '/users/myself',
  '/users/@me/activity-feed': () => '/users/@me/activity-feed',
  '/users/@me/queue': () => '/users/@me/queue',
  '/users/@me/queue/{journey_id}': (parameters: { journey_id: number }) =>
    format('/users/@me/queue/{journey_id}', parameters),
  '/users/{id}/activity': (parameters: { id: number }) =>
    format('/users/{id}/activity', parameters),
};

export default Paths;
