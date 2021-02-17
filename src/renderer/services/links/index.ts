import Format from 'string-format';
import journeys from './journeys';
import user from './user';

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
      Format(`${CONFIG.renderer.web.login}?came_from={referer}`, {
        referer: 'app',
      }),
  },
  desktop: {
    protocol: {
      auth_callback: (acess_token: string) =>
        `${CONFIG.main.protocol}://auth/osu/callback`,
    },
  },
};
