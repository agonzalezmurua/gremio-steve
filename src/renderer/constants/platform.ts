/**
 * This module constants related to electron's resolved variables
 */

/**
 * Indicates if the current execution ambient is either electron or a regular browser
 * by refering to a injected value from the former
 *
 * Comparing this to `false` is the same as using`isElectron` against `true`
 *
 * If that's the case prefer using `isElectron` for better code clarity
 */
export const isBrowser = window.platform === undefined;

/**
 * Indicates if the current execution ambient is either electron or a regular browser
 * by refering to a injected value from the former
 *
 * Comparing this to `true` is the same as using `isElectron` against `false`
 *
 * If that's the case prefer using `isBrowser` for better code clarity
 */
export const isElectron = window.platform !== undefined;

/**
 * Injected value from electron, when consumed from browser it will default to `undefined`
 */
export const currentPlatform = window.platform;
