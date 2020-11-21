const URI = 'http://localhost:8882';

export default {
  beatmaps: {
    search: (search: string) => {
      const url = new URL('/api/journeys', URI);
      url.searchParams.append('search', search);
      return url.toString();
    },
  },
};
