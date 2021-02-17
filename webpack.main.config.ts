const webpack = require('webpack');
const path = require('path');
const ConfigWebpackPlugin = require('config-webpack');

module.exports = [
  {
    cache: true,
    entry: './src/main/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve('build'),
    },
    target: 'electron-main',
    node: {
      __dirname: false,
    },
    plugins: [
      new ConfigWebpackPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: false,
      }),
    ],
  },
  {
    entry: './src/main/preload.js',
    target: 'electron-preload',
    output: {
      path: path.resolve('build'),
      filename: 'preload.js',
    },
  },
] as Array<import('webpack').Configuration>;
