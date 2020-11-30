const { execSync } = require('child_process');
const path = require('path');

const langFolder = path.resolve('./app/lang');
const compiledLangFolder = path.resolve('./app/compiled-lang');

const compileCommand = (lang) =>
  `npx formatjs compile ${langFolder}/${lang} --ast --out-file ${compiledLangFolder}/${lang}`;
const build = (lang) => execSync(compileCommand(lang));

module.exports = {
  langFolder,
  compiledLangFolder,
  compileCommand,
  build,
};
