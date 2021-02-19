import { Definitions } from '@/services/api';
import { LoggedUser } from '@/typings/gremio-steve';
import jwt_decode from 'jwt-decode';

const KEY = 'authentication';

const AuthenticationStorage = {
  /** Decodes the acces_token value, if invalid then returns null */
  get_user: (): LoggedUser | null => {
    const authentication = AuthenticationStorage.get();
    try {
      return jwt_decode<LoggedUser>(authentication.access_token);
    } catch (error) {
      // jwt_decode error because of invalid string should catch here
      return null;
    }
  },
  /** Obtains the stored value */
  get: () => {
    const stored = localStorage.getItem(KEY);
    return JSON.parse(stored) as Definitions['Authentication.Response'] | null;
  },
  write: (authentication: Definitions['Authentication.Response']) =>
    localStorage.setItem(KEY, JSON.stringify(authentication)),
  remove: () => localStorage.removeItem(KEY),
};

export const AuthenticationStorageKey = KEY;

export default AuthenticationStorage;
