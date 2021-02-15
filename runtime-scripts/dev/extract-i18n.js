const chokidar = require('chokidar');
const consola = require('consola');
const { srcFolder, extract } = require('../i18n.commands');
const { languages } = require('../../package.json');

const watchExpression = path.join(srcFolder, '/**/*.tsx');

const watcher = chokidar.watch(watchExpression);

watcher.on('change', () => {
  languages.forEach((lang) => {
    try {
      extract(lang);
    } catch (error) {
      consola.error(lang, 'failed to build');
    }
  });
});

consola.info('watching', watchExpression);
