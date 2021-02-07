import Electron from 'electron';

declare global {
  interface Window {
    electron: typeof Electron;
    platform: typeof process.platform;
  }
}
