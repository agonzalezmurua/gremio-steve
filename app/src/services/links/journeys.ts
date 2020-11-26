import { generatePath } from 'react-router';

const resourceName = 'journeys';

export default {
  id: (params: { id: string }) => generatePath(`/${resourceName}/:id`, params),
  new: () => generatePath(`/${resourceName}/new`),
};
