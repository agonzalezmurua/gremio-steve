import { generatePath } from 'react-router';

const resourceName = 'user';

export default {
  ':id': (params: { id: string }) =>
    generatePath(`/${resourceName}/:id`, params),
};
