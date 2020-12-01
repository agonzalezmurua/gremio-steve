const { execSync } = require('child_process');
const path = require('path');

const srcFolder = path.resolve('./app/src');
const langFolder = path.resolve('./app/lang');
const compiledLangFolder = path.resolve('./app/compiled-lang');

const build = (lang) =>
  execSync(
    `npx formatjs compile ${langFolder}/${lang} --ast --out-file ${compiledLangFolder}/${lang}`
  );
const extract = (lang) =>
  execSync(
    `npx formatjs extract 'app/src/**/*.ts**' --out-file=app/lang/${lang} --id-interpolation-pattern='[sha512:contenthash:base64:6]'`
  );

module.exports = {
  langFolder,
  compiledLangFolder,
  build,
  extract,
  srcFolder,
};
