import jwt_decode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

import { Definitions } from '_/services/api';
import { LoggedUser, AuthenticationState } from '_/typings/gremio-steve';

const ACCESS_TOKEN_KEY = 'authentication';
const STATE_KEY = 'oauthstate';

const AuthenticationStorage = {
  /** Decodes the acces token value, if invalid then returns null */
  readUser: (): LoggedUser | null => {
    const access_token = AuthenticationStorage.readToken();
    try {
      return jwt_decode<LoggedUser>(access_token);
    } catch (error) {
      // jwt_decode error because of invalid string should catch here
      return null;
    }
  },
  /** Obtains the stored access token */
  readToken: () => {
    const stored = localStorage.getItem(ACCESS_TOKEN_KEY);
    return JSON.parse(stored) as
      | Definitions['Authentication.Response']['access_token']
      | null;
  },
  readState: (): AuthenticationState => {
    return JSON.parse(sessionStorage.getItem(STATE_KEY)) as AuthenticationState; // oauth state value, one use only
  },
  /**
   * From the authentication response, write the acccess_token into the storage
   * @param access_token
   */
  writeToken: (
    access_token: Definitions['Authentication.Response']['access_token']
  ) => {
    return localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(access_token));
  },
  /**
   * Generate a unique authentication state taht is stored in session storage
   * @returns Authentication State value
   */
  writeState: () => {
    const state: AuthenticationState = {
      identifier: uuidv4(),
    };

    sessionStorage.setItem(STATE_KEY, JSON.stringify(state));

    return state;
  },
  /**
   * Deletes the authentication state value from the storage
   */
  removeState: () => {
    sessionStorage.removeItem(STATE_KEY); // Ensure that this value is deleted right away
  },
  /**
   * Removes the access token from the storage
   */
  removeToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export const AuthenticationStorageKey = ACCESS_TOKEN_KEY;

export default AuthenticationStorage;
