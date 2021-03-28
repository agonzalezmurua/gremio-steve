import { generatePath } from 'react-router';

const resource = 'user';

export default {
  profile: (params: { id: number }) => generatePath(`/${resource}/:id/profile`, params),
  queue: (params: { id: number }) => generatePath(`/${resource}/:id/queue`, params),
  activity: (params: { id: number }) => generatePath(`/${resource}/:id/activity`, params),
  bookmarks: (params: { id: number }) => generatePath(`/${resource}/:id/bookmarks`, params),
};
