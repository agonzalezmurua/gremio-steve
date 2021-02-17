const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const { installExtensions } = require('./extensions');
const consola = require('consola');
const path = require('path');
const mode = process.env.NODE_ENV || 'development';

const protocolSchema = CONFIG.main.protocol;

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
  if (mode === 'development') {
    window.loadURL(`http://localhost:${CONFIG.webpack.dev_server.port}`); // (2) <- load react
  } else {
    window.loadURL(`file://${__dirname}/renderer/index.html`);
  }
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

  if (!app.isDefaultProtocolClient(protocolSchema)) {
    app.setAsDefaultProtocolClient(protocolSchema);
  }

  protocol.registerHttpProtocol(protocolSchema, (req) => {
    const fullUrl = formFullTodoUrl(req.url);
    consola.debug('full url to open ' + fullUrl);
    mainWindow.loadURL(fullUrl);
  });
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
