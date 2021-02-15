import { createContext } from 'react';

type AppContextType = {
  currentUser: User;
};

const AppContext = createContext<AppContextType>({
  currentUser: {
    _id: 'current_user_id',
    banner_url: '',
    status: '',
    journeys: [],
    community_role: '',
    description: '',
    preferences: [],
    availability: {
      guest_diffs: true,
      mods: true,
      playtesting: true,
    },
    avatar_url: 'https://a.ppy.sh/1869277?1462143398.jpg',
    name: 'Example Username',
    queue: [],
  },
});

export default AppContext;
