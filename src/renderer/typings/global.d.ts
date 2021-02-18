import Electron from 'electron';

declare global {
  interface Window {
    /**
     * Preloaded electron module, only available on electron, ensure that it's
     * only being used by consuming `isBrowser` or `currentPlatform` or `window.platform` to conditionally
     * use any method exposed here
     */
    electron: typeof Electron;
    /**
     * Injected value from preload, when consumed from browser it will compute to `undefined`
     */
    platform: typeof process.platform;
  }
}
