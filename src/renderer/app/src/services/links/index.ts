import journeys from './journeys';
import user from './user';

export default {
  journeys,
  user,
  pages: {
    not_found: () => '/not-found',
    login: () => '/login',
  },
};
