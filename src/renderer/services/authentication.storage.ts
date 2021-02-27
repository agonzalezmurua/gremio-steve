import { Definitions } from '@/services/api';
import { LoggedUser } from '@/typings/gremio-steve';
import jwt_decode from 'jwt-decode';

const KEY = 'authentication';

const AuthenticationStorage = {
  /** Decodes the acces_token value, if invalid then returns null */
  readUser: (): LoggedUser | null => {
    const access_token = AuthenticationStorage.read();
    try {
      return jwt_decode<LoggedUser>(access_token);
    } catch (error) {
      // jwt_decode error because of invalid string should catch here
      return null;
    }
  },
  /** Obtains the stored access token */
  read: () => {
    const stored = localStorage.getItem(KEY);
    return JSON.parse(stored) as
      | Definitions['Authentication.Response']['access_token']
      | null;
  },
  /**
   * From the authentication response, write the acccess_token into the storage
   * @param access_token
   */
  write: (
    access_token: Definitions['Authentication.Response']['access_token']
  ) => localStorage.setItem(KEY, JSON.stringify(access_token)),
  remove: () => localStorage.removeItem(KEY),
};

export const AuthenticationStorageKey = KEY;

export default AuthenticationStorage;
