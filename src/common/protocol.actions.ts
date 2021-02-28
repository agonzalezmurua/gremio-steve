//
// This module exposes query string values called
// actions, which are then handled by app's renderer process
//

/**
 * Protocol actions trigger the opening of the app's
 * from the user's browser.
 */
export enum Action {
  authenticate = 'authenticate',
}
