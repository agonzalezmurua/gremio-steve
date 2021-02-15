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
};
