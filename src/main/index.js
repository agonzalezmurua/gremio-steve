const { app, BrowserWindow, ipcMain } = require('electron');
const { installExtensions } = require('./extensions');
const config = require('config');
const consola = require('consola');
const path = require('path');

try {
  // Hot reloading for main process, that means if any file inside main changes it triggers a full app reload
  require('electron-reloader')(module, { ignore: 'app/**' });
} catch (error) {
  consola.error(error);
}

/** @type {BrowserWindow} */
let window = null;

function createWindow() {
  window = new BrowserWindow({
    height: 800,
    width: 1200,
    minWidth: 768,
    minHeight: 480,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'), // (1) <- preload script
    },
    frame: process.platform !== 'win32',
    titleBarStyle: process.platform !== 'win32' ? 'hidden' : 'default',
  });

  window.setMenuBarVisibility(null);
  window.loadURL(`http://localhost:${config.get('webpack.dev_server.port')}`); // (2) <- load react
  // window.webContents.openDevTools();
  window.on('closed', () => {
    window = null; // (3) <- deference when window is closed
  });

  ipcMain.on('minimize', () => {
    window.isMinimized() ? window.restore() : window.minimize();
  });
  ipcMain.on('maximize', () => {
    window.isMaximized() ? window.restore() : window.maximize();
  });
  ipcMain.on('close', () => {
    window.close();
  });
}

app.on('ready', () => {
  installExtensions(); // (4) <- install dev tools when on dev environment
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
