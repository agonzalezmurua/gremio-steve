import { useMemo, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

import { LoggedUser } from '@/typings/gremio-steve';
import Api from '@/services/api';

export const ACCESS_TOKEN_KEY = 'access_token';

type Actions =
  | {
      type: 'login';
      token: string;
    }
  | { type: 'logoff' };

function UserReducer(state: LoggedUser, action: Actions) {
  switch (action.type) {
    case 'login':
      const user = jwt_decode<LoggedUser>(action.token);
      localStorage.setItem(ACCESS_TOKEN_KEY, action.token);
      Api.Client.defaults.headers = {
        Authorization: `Bearer ${action.token}`,
      };
      return user;
    case 'logoff':
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      delete Api.Client.defaults.headers.Authorization;
      return null;
    default:
      return state;
  }
}

const useUserReducer = () => {
  const initialState = useMemo<LoggedUser | null>(() => {
    try {
      return jwt_decode<LoggedUser>(localStorage.getItem(ACCESS_TOKEN_KEY));
    } catch (error) {
      return null;
    }
  }, []);

  return useReducer(UserReducer, initialState);
};

export default useUserReducer;
