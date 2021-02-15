const consola = require('consola');
const { extract } = require('../i18n.commands');
const { languages } = require('../../package.json');

languages.forEach((lang) => {
  try {
    consola.info('extracting', lang);

    extract(lang);
  } catch (error) {
    consola.error(lang, 'failed to build');
  }
});
