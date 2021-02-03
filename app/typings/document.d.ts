import Electron from 'electron';
import os from 'os';

declare global {
  interface Window {
    electron: typeof Electron;
    os: typeof os;
  }
}
