import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import log from 'electron-log';
import config from './config';
import { installExtensions } from './extensions';
import { parseProtocolURL } from './protocol.parse-url';
import * as IpcEvents from '../common/ipc.events';

import { createClient } from '../common/api/client';
import { createOperations } from '../common/api/operations';
import Paths from '../common/api/paths';

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = process.env.DEBUG === 'true';
const DARWIN = process.platform === 'darwin';
const WIN32 = process.platform === 'win32';
/** Extra argument for the protocol launcher on Windows */
const protocolLauncherArg = '--protocol-launcher';
/** This expression captures from a string {protocol}://{path} */
const protocolExpression = new RegExp(/(.*):\/\/(.*)/s);

/** API client */
const Client = createClient({
  baseURL: config.api_uri,
});
const Operations = createOperations(Client);

let mainWindow: BrowserWindow = null;

let authWindow: BrowserWindow = null;

/** Creates the authentication window instance */
function createAuthWindow() {
  authWindow = new BrowserWindow({
    width: 800,
    height: 800,
  });

  authWindow.webContents.on('will-redirect', function (event, url) {
    handleAuthCallback(url);
  });

  authWindow.on('close', () => {
    authWindow = null;
  });
}

/**
 * Creates the main window instance
 */
async function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    minWidth: 768,
    minHeight: 480,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
    frame: process.platform !== 'win32',
    titleBarStyle: process.platform !== 'win32' ? 'hidden' : 'default',
    autoHideMenuBar: true,
  });

  if (NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:3000`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);
  }

  installExtensions();

  //#region Handle events targetting the main window
  mainWindow.on('closed', () => {
    mainWindow = null; // deference window when closed
  });

  ipcMain.on(IpcEvents.Main.Events.minimize_window, () => {
    mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize();
  });
  ipcMain.on(IpcEvents.Main.Events.maximize_window, () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });
  ipcMain.on(IpcEvents.Main.Events.close_window, () => {
    mainWindow.close();
  });

  ipcMain.on(IpcEvents.Main.Events.open_auth, () => {
    createAuthWindow();
    authWindow.loadURL(config.api_uri + Paths['/auth/osu']());
    authWindow.show();
  });
  //#endregion
}

//#region Handle protocol calls
/**
 * Handle the url sent to this application
 * @param url the incoming url argument
 */
function handleAppURL(url: string) {
  log.info('Processing protocol url');
  const action = parseProtocolURL(url); // Action payload to pass onto the ipcRenderer process
  // This manual focus call _shouldn't_ be necessary, but is for Chrome on
  // macOS. See https://github.com/desktop/desktop/issues/973.
  log.info(`Sending action!\n${JSON.stringify(action, null, 4)}`);
  if (mainWindow) {
    mainWindow.focus();
    mainWindow.show();
    mainWindow.webContents.send(action.name, action.payload);
  }
}
/**
 * Wrapper around app.setAsDefaultProtocolClient that adds our
 * custom prefix command line switches on Windows.
 * @param procotol Protocol that is used as a application identifier
 */
function setAsDefaultProtocolClient(protocol: string) {
  if (!protocol) {
    return;
  }

  if (WIN32 && (NODE_ENV === 'development' || DEBUG === true)) {
    // Special handling on Windows while developing.
    // See https://stackoverflow.com/a/53786254/64904
    // remove so we can register each time as we run the app.
    app.removeAsDefaultProtocolClient(protocol);
    // Set the path of electron.exe and files
    // The following works for Electron v11.
    // Use the following console script to see the argv contents
    // process.argv.forEach((v, i)=> log.info(`argv[${i}] ${v}`));
    log.info(process.argv);
    app.setAsDefaultProtocolClient(protocol, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else if (WIN32) {
    app.removeAsDefaultProtocolClient(protocol);
    app.setAsDefaultProtocolClient(protocol, process.execPath, [
      protocolLauncherArg,
    ]);
  } else {
    app.removeAsDefaultProtocolClient(protocol);
    app.setAsDefaultProtocolClient(protocol);
  }
}

/**
 * Attempt to detect and handle any protocol handler arguments passed
 * either via the command line directly to the current process or through
 * IPC from a duplicate instance (see makeSingleInstance)
 *
 * @param args Essentially process.argv, i.e. the first element is the exec
 *             path
 */
function handlePossibleProtocolLauncherArgs(args: Readonly<string[]>) {
  log.info(`Received possible protocol arguments: ${args.length}`);

  if (WIN32) {
    // Desktop registers its protocol handler callback on Windows as
    // `[executable path] --protocol-launcher "%1"`. Note that extra command
    // line arguments might be added by Chromium
    // (https://electronjs.org/docs/api/app#event-second-instance).
    // At launch Desktop checks for that exact scenario here before doing any
    // processing. If there's more than one matching url argument because of a
    // malformed or untrusted url then we bail out.
    //
    // During development, there might be more args.
    // Strategy: look for the arg that is protocolLauncherArg,
    // then use the next arg as the incoming URL

    // Debugging:
    args.forEach((v, i) => log.info(`argv[${i}] ${v}`));

    // find the argv index for protocolLauncherArg
    const url = args.find((arg) => protocolExpression.test(arg));

    if (url === undefined) {
      log.error(`Ignoring unexpected launch arguments: ${args}`);
      return;
    }
    // From the URL, obtain protocol and path
    const [, protocolMatch] = url.match(protocolExpression);

    log.info(NODE_ENV);

    if (protocolMatch !== config.protocol) {
      log.error(`url did not match protocol ${config.protocol}`);
      return;
    }
    handleAppURL(url);
    // End of WIN32 case
  } else if (args.length > 1) {
    // Mac or linux case
    handleAppURL(args[1]);
  }
}
//#endregion

//#region Handling of possible multiple unwanted instances, depending on the platform
if (DARWIN) {
  app.on('open-url', (event, url) => {
    event.preventDefault();
    handleAppURL(url);
  });
} else if (WIN32 && process.argv.length > 1) {
  // When opened by a protocol on a browser, Windows will open a new instance of Electron
  log.info('handlePossibleProtocolLauncherArgs', process.argv);
  handlePossibleProtocolLauncherArgs(process.argv);
}

// Are we a duplicate?
let isDuplicateInstance = false;
const gotSingleInstanceLock = app.requestSingleInstanceLock();
isDuplicateInstance = !gotSingleInstanceLock;
// Hari-kari if we're a clone
if (isDuplicateInstance) {
  app.quit();
}

// Someone tried to run a second instance, we should focus our window.
app.on('second-instance', (_event, args) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }

    mainWindow.focus();
  }

  handlePossibleProtocolLauncherArgs(args);
});
//#endregion  Handling of possible multiple unwanted instances, depending on the platform

//#region Event handlers
app.on('ready', () => {
  log.info('registering protocol', config.protocol);
  setAsDefaultProtocolClient(config.protocol);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

app
  .whenReady()
  .then(createWindow)
  .catch((error) => {
    console.error('error creating window', error);
  });
//#endregion

//#region Auth window events / Handle callback
async function handleAuthCallback(url: string) {
  log.info('handleAuthCallback', url);
  const raw_code = /code=([^&]\*)/.exec(url) || null;
  const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
  const error = /\?error=(.+)\$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    authWindow.destroy();
  }

  // If there is a code, proceed to get token from the api
  if (code) {
    const { data } = await Operations.authenticateUser({
      body: { authentication: { code: code } },
    });
    log.info('received response from auth server', data);
  } else if (error) {
    alert(
      "Oops! Something went wrong and we couldn't" +
        'log you in. Please try again.'
    );
  }
}
//#endregion Auth window events
