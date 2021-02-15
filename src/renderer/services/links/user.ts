import { generatePath } from 'react-router';

const resource = 'user';

export default {
  profile: (params: { id: string }) =>
    generatePath(`/${resource}/:id/profile`, params),
  queue: (params: { id: string }) =>
    generatePath(`/${resource}/:id/queue`, params),
  activity: (params: { id: string }) =>
    generatePath(`/${resource}/:id/activity`, params),
  bookmarks: (params: { id: string }) =>
    generatePath(`/${resource}/:id/bookmarks`, params),
};
