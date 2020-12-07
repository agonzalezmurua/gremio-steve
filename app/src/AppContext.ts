import { createContext } from 'react';

type AppContext = {
  currentUser: User;
};

const AppContext = createContext<AppContext>({
  currentUser: {
    __id: 'current_user_id',
    avatar: {
      url: 'https://a.ppy.sh/1869277?1462143398.jpg',
    },
    name: 'Example Username',
    queue: [],
  },
});

export default AppContext;
