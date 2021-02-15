//
// Compile this into a react-intl consumable JSON file
//
const consola = require('consola');
const fs = require('fs');
const { srcLangFolder, build } = require('../i18n.commands');

const locales = fs.readdirSync(srcLangFolder);

locales.forEach((locale) => {
  consola.info('building', locale);
  build(locale);
});
