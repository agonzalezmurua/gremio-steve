import { Definitions } from '@/services/api';
import { LoggedUser } from '@/typings/gremio-steve';
import jwt_decode from 'jwt-decode';

const KEY = 'authentication';

const AuthenticationStorage = {
  /** Decodes the acces_token value, if invalid then returns null */
  get_user: (): LoggedUser | null => {
    const access_token = AuthenticationStorage.get();
    try {
      return jwt_decode<LoggedUser>(access_token);
    } catch (error) {
      // jwt_decode error because of invalid string should catch here
      return null;
    }
  },
  /** Obtains the stored value */
  get: () => {
    const stored = localStorage.getItem(KEY);
    return JSON.parse(stored) as
      | Definitions['Authentication.Response']['access_token']
      | null;
  },
  write: (authentication: Definitions['Authentication.Response']) =>
    localStorage.setItem(KEY, JSON.stringify(authentication.access_token)),
  remove: () => localStorage.removeItem(KEY),
};

export const AuthenticationStorageKey = KEY;

export default AuthenticationStorage;
