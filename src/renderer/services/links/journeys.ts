import { generatePath } from 'react-router';

const resourceName = 'journeys';

export default {
  id: (params: { id: number }) => generatePath(`/${resourceName}/:id`, params),
  comment: (params: { id: number; commentNode: string }) => generatePath(`/${resourceName}/:id/:commentNode`, params),
  new: () => generatePath(`/${resourceName}/new`),
};
