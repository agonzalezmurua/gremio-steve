import { Definitions } from '../api';
import journeys from './journeys';
import user from './user';
import querystring from 'query-string';

export default {
  journeys,
  user,
  pages: {
    home: () => '/',
    not_found: () => '/not-found',
    error_500: () => '/error/500',
    error_400: () => '/error/400',
    login: () => '/login',
  },
  web: {
    login: () =>
      `${CONFIG.renderer.web.login}?${querystring.stringify({
        came_from: 'app',
      })}`,
  },
  desktop: {
    protocol: {
      authenticate: (parameters: Definitions['Authentication.Response']) =>
        `${CONFIG.main.protocol}://?${querystring.stringify({
          action: 'authenticate',
          ...parameters,
        })}`,
    },
  },
};
