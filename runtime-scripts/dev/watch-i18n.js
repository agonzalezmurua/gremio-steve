const chokidar = require('chokidar');
const consola = require('consola');
const { compiledLangFolder, build } = require('../i18n.commands');
const path = require('path');

const watchExpression = path.join(compiledLangFolder, '/*.json');

const watcher = chokidar.watch(watchExpression);

watcher.on('add', (dir) => {
  const locale = path.relative(compiledLangFolder, dir);
  consola.info('watching', locale);
});

watcher.on('change', (dir) => {
  const locale = path.relative(compiledLangFolder, dir);
  consola.info('building', locale);
  try {
    build(locale);
  } catch (error) {
    consola.error(locale, 'failed to build');
  }
});

consola.info('watching', watchExpression);
