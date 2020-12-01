//
// Compile this into a react-intl consumable JSON file
//

const consola = require('consola');
const fs = require('fs');
const { langFolder, build, extract } = require('../compile-i18n');
const { languages } = require('../../package.json');

const locales = fs.readdirSync(langFolder);

locales.forEach((locale) => {
  consola.info('building', locale);
  build(locale);
});

languages.forEach((lang) => {
  try {
    const _langFile = `${lang}.json`;
    extract(_langFile);
  } catch (error) {
    consola.error(lang, 'failed to extract: ', error);
  }
});
