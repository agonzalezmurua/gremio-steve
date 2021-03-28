import jwt_decode from 'jwt-decode';

import { components } from 'common/typings/api.gremio-steve';

import { LoggedUser } from '_/typings/gremio-steve';

const ACCESS_TOKEN_KEY = 'authentication';

type AuthResponse = components['schemas']['AuthResponse'];

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
    return JSON.parse(stored) as AuthResponse['access_token'] | null;
  },
  /**
   * From the authentication response, write the acccess_token into the storage
   * @param access_token
   */
  writeToken: (access_token: AuthResponse['access_token']) => {
    return localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(access_token));
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
