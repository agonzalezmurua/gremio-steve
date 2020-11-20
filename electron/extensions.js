/**
 * Instals Development extenssions for debugging purposes
 */
function installExtensions() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const {
    default: install,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require("electron-devtools-installer");
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map((extension) =>
    install(extension)
      .then((extension) => console.log(`Installed: ${extension}`))
      .catch((err) => console.err(`Failed to install: ${extension}`, err))
  );
}

module.exports = {
  installExtensions,
};
