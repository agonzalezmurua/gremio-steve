const webpack = require('webpack');
const path = require('path');

module.exports = [
  {
    entry: './src/main/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve('dist'),
    },
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: 'node-loader',
        },
      ],
    },
    node: {
      __dirname: false,
    },
  },
  {
    entry: './src/main/preload.js',
    target: 'electron-preload',
    output: {
      path: path.resolve('dist'),
      filename: 'preload.js',
    },
  },
] as Array<import('webpack').Configuration>;
