const { app, BrowserWindow } = require("electron");
const { installExtensions } = require("./extensions");
const config = require("config");
const consola = require("consola");

try {
  // Hot reloading for main process, that means if any file inside main changes it triggers a full app reload
  require("electron-reloader")(module, { ignore: "app/**" });
} catch (error) {
  consola.error(error);
}

let window = null;

function createWindow() {
  window = new BrowserWindow({
    height: 800,
    width: 1200,
    minWidth: 640,
    minHeight: 480,
    transparent: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + "/preload.js", // (1) <- preload script
    },
  });

  window.setMenuBarVisibility(null);
  window.loadURL(`http://localhost:${config.get("app.dev.port")}`); // (2) <- load react
  window.webContents.openDevTools();
  window.on("closed", () => {
    window = null; // (3) <- deference when window is closed
  });
}

app.on("ready", () => {
  installExtensions(); // (4) <- install dev tools when on dev environment
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});
