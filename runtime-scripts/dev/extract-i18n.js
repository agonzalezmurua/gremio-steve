const chokidar = require('chokidar');
const consola = require('consola');
const { srcFolder, extract } = require('../compile-i18n');
const { languages } = require('../../package.json');

const watchExpression = srcFolder + '/**/*.tsx';

const watcher = chokidar.watch(watchExpression);

watcher.on('change', () => {
  languages.forEach((lang) => {
    try {
      const _langFile = `${lang}.json`;

      extract(_langFile);
    } catch (error) {
      consola.error(lang, 'failed to build');
    }
  });
});

consola.info('watching', watchExpression);
