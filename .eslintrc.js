module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types:': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    __static: true,
  },
  settings: {
    react: {
      version: '16',
    },
  },
};