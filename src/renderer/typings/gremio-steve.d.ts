import { Definitions } from '@/services/api';

/**
 *
 * See [auth0.com's documentation about the state parameter](https://auth0.com/docs/protocols/state-parameters)
 *
 * This value allows us to prevent the attack by confirming
 * that the value coming from the response matches the one you sent from the login.
 *
 */
export type AuthenticationState = {
  /** uuidv4 identifier, generated on request */
  identifier: string;
  /**
   * Pending for implementation, it tells the callback handler what was the original navigation intent
   * for protected resources
   */
  original_url?: string;
};

/** Infered information that will be extracted once the acess_token is decoded */
export interface LoggedUser
  extends Pick<Definitions['User'], 'id' | 'osu_id' | 'name' | 'avatar_url'> {}
