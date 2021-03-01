/**
 * Extension of AppContext, exposes information
 * about the current logged user (if present)
 */

import { useMemo, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

import { LoggedUser } from '_/typings/gremio-steve';
import Api, { Definitions } from '_/services/api';
import AuthenticationStorage from '_/services/authentication.storage';

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
      AuthenticationStorage.writeToken(action.authentication.access_token);
      return AuthenticationStorage.readUser();
    case 'logout':
      AuthenticationStorage.removeToken();
      return null;
    default:
      return state;
  }
}

const useUserReducer = () => {
  return useReducer(userReducer, AuthenticationStorage.readUser());
};

export default useUserReducer;
