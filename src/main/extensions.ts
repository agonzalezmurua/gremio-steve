import log from 'electron-log';

/**
 * Instals Development extenssions for debugging purposes
 */
export async function installExtensions() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const {
    default: install,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');

  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map((extension) =>
    install(extension)
      .then((extension) => log.log(`Installed: ${extension}`))
      .catch((err) => log.error(`Failed to install: ${extension}`, err))
  );
}
