import { generatePath } from 'react-router';

const resourceName = 'journeys';

export default {
  id: (params: { id: string }) => generatePath(`/${resourceName}/:id`, params),
  comment: (params: { id: string; commentNode: string }) =>
    generatePath(`/${resourceName}/:id/:commentNode`, params),
  new: () => generatePath(`/${resourceName}/new`),
};
