import React, { createContext } from 'react';

import useUserReducer from './user';
import { Definitions } from '../../services/api';
import { LoggedUser } from '../../typings/gremio-steve';

type AppContextType = {
  user: LoggedUser;
  isLoggedIn: boolean;
  actions: {
    login: (authentication: Definitions['Authentication.Response']) => void;
    logoff: () => void;
  };
};

const AppContext = createContext<AppContextType>({
  user: {
    id: 'current_user_id',
    avatar_url: '',
    name: '',
    osu_id: '',
  },
  isLoggedIn: true,
  actions: {
    login: () => {},
    logoff: () => {},
  },
});

export const AppContextProvider: React.FC = (props) => {
  const [user, dispatch] = useUserReducer();

  return (
    <AppContext.Provider
      value={{
        user: user,
        isLoggedIn: user !== null,
        actions: {
          login: (authentication) =>
            dispatch({ type: 'login', authentication: authentication }),
          logoff: () => dispatch({ type: 'logoff' }),
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
