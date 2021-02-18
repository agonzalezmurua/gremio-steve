import React, { createContext } from 'react';

import useUserReducer from './user';
import { Definitions } from '../../services/api';
import { LoggedUser } from '../../typings/gremio-steve';

type AppContextType = {
  /**
   * User value, decoded from the `acess_token` provided, this value
   * can be null if the user is not present so is advised to use `isLoggedIn` value
   * before trying to use this value
   */
  user?: LoggedUser;
  isLoggedIn: boolean;
  actions: {
    /**
     * Authenticates the user by:
     * - Storing the authentication object into localStorage
     * - Setting the `Authorization` header on the Api Client
     * - Updating the state to the `acess_token` decoded value
     */
    login: (authentication: Definitions['Authentication.Response']) => void;
    /**
     * Invalidates de user session by:
     * - Deleting the authentication object into localStorage
     * - Deleting the `Authorization` header from the Api Client
     * - Updating the state so the user is null
     */
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
