const { execSync } = require('child_process');
const path = require('path');

const srcFolder = 'src/renderer';
const srcLangFolder = 'src/lang/raw';
const compiledLangFolder = 'src/lang/compiled';

const build = (lang) => {
  const dir = path.join(srcLangFolder, lang);
  const outFile = path.join(compiledLangFolder, lang);
  const command = `npx formatjs compile "${dir}" --ast --out-file="${outFile}"`;

  consola.debug('running cli command:', command);
  execSync(command);
};

const extract = (lang) => {
  const glob = 'src/{renderer,**}/!(*.d).{ts,tsx}'; //  All .ts or .tsx files but ignoring declarations
  const outFile = path.join(srcLangFolder, `${lang}.json`);
  const command = `npx formatjs extract "${glob}" --out-file=${outFile} --id-interpolation-pattern='[sha512:contenthash:base64:6]'`;

  consola.debug('running cli command:', command);
  execSync(command);
};

module.exports = {
  srcLangFolder,
  compiledLangFolder,
  srcFolder,
  build,
  extract,
};
