//
// Compile this into a react-intl consumable JSON file
//
const consola = require('consola');
const fs = require('fs');
const { langFolder, build } = require('../compile-i18n');

const locales = fs.readdirSync(langFolder);

locales.forEach((locale) => {
  consola.info('building', locale);
  build(locale);
});
