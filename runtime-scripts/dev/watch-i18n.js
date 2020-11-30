const chokidar = require('chokidar');
const consola = require('consola');
const { langFolder, build } = require('../compile-i18n');
const path = require('path');

const watchExpression = langFolder + '/*.json';

const watcher = chokidar.watch(watchExpression);

watcher.on('add', (dir) => {
  const locale = path.relative(langFolder, dir);
  consola.info('watching', locale);
});

watcher.on('change', (dir) => {
  const locale = path.relative(langFolder, dir);
  consola.info('building', locale);
  try {
    build(locale);
  } catch (error) {
    consola.error(locale, 'failed to build');
  }
});

consola.info('watching', watchExpression);
