const consola = require('consola');
const { srcFolder, extract } = require('../compile-i18n');
const { languages } = require('../../package.json');

languages.forEach((lang) => {
  try {
    consola.info('extracting', lang);
    const _langFile = `${lang}.json`;

    extract(_langFile);
  } catch (error) {
    consola.error(lang, 'failed to build');
  }
});
