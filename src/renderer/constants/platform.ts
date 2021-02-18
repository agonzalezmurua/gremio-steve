/**
 * This module constants related to electron's resolved variables
 */

/**
 * Indicates if the current execution ambient is either electron or a regular browser
 * by refering to a injected value from the former
 */
export const isBrowser = window.platform === undefined;
/**
 * Injected value from electron, when consumed from browser it will default to `undefined`
 */
export const currentPlatform = window.platform;
