const { execSync } = require('child_process');
const path = require('path');

const srcFolder = path.resolve('./app/src');
const langFolder = path.resolve('./app/lang');
const compiledLangFolder = path.resolve('./app/compiled-lang');

const build = (lang) => {
  const command = `npx formatjs compile "${path.join(
    langFolder,
    lang
  )}" --ast --out-file="${path.join(compiledLangFolder, lang)}"`;
  consola.debug('running cli command:', command);
  execSync(command);
};
const extract = (lang) => {
  const command = `npx formatjs extract app/src/**/*.ts** --out-file=app/lang/${lang} --id-interpolation-pattern='[sha512:contenthash:base64:6]'`;
  consola.debug('running cli command:', command);
  execSync(command);
};

module.exports = {
  langFolder,
  compiledLangFolder,
  build,
  extract,
  srcFolder,
};
