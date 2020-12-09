const URI = 'http://localhost:8882';

const basePath = '/api';

export default {
  journeys: {
    byId: (id: string) => {
      return new URL(`${basePath}/journeys/${id}`, URI).toString();
    },
    search: (search: string) => {
      const url = new URL(`${basePath}/journeys`, URI);
      url.searchParams.append('search', search);
      return url.toString();
    },
  },
  user: {
    default: (id: string) => {
      return new URL(`${basePath}/user/${id}`, URI).toString();
    },
    queue: (id: string) => {
      return new URL(`${basePath}/user/${id}/queue`, URI).toString();
    },
    activity: (id: string) => {
      return new URL(`${basePath}/user/${id}/activity`, URI).toString();
    },
  },
};
