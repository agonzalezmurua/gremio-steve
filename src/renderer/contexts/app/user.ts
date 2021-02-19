/**
 * Extension of AppContext, exposes information
 * about the current logged user (if present)
 */

import { useMemo, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

import { LoggedUser } from '@/typings/gremio-steve';
import Api, { Definitions } from '@/services/api';

export const AUTHENTICATION = 'authentication';

/**
 * Available reducer actions
 */
type Actions =
  | {
      type: 'login';
      authentication: Definitions['Authentication.Response'];
    }
  | { type: 'logout' };

function userReducer(state: LoggedUser = null, action: Actions) {
  switch (action.type) {
    case 'login':
      const user = jwt_decode<LoggedUser>(action.authentication.access_token);
      localStorage.setItem(
        AUTHENTICATION,
        JSON.stringify(action.authentication)
      );
      Api.Client.defaults.headers = {
        Authorization: `Bearer ${action.authentication.access_token}`,
      };
      return user;
    case 'logout':
      localStorage.removeItem(AUTHENTICATION);
      delete Api.Client.defaults.headers.Authorization;
      return null;
    default:
      return state;
  }
}

const useUserReducer = () => {
  const initialState = useMemo<LoggedUser | null>(() => {
    const authentication:
      | Definitions['Authentication.Response']
      | null = JSON.parse(localStorage.getItem(AUTHENTICATION));
    try {
      return authentication !== null
        ? jwt_decode<LoggedUser>(authentication.access_token)
        : null;
    } catch (error) {
      // jwt_decode error because of invalid string should catch here
      return null;
    }
  }, []);

  return useReducer(userReducer, initialState);
};

export default useUserReducer;
