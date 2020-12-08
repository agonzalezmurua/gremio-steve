const URI = 'http://localhost:8882';

const basePath = '/api';

export default {
  journeys: {
    byId: (id: string) => {
      const url = new URL(`${basePath}/journeys/${id}`, URI);
      return url.toString();
    },
    search: (search: string) => {
      const url = new URL(`${basePath}/journeys`, URI);
      url.searchParams.append('search', search);
      return url.toString();
    },
  },
  user: {
    queue: (id: string) => {
      const url = new URL(`${basePath}/user/${id}/queue`, URI);
      return url.toString();
    },
    activity: (id: string) => {
      const url = new URL(`${basePath}/user/${id}/activity`, URI);
      return url.toString();
    },
  },
};
