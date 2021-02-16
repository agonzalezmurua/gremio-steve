import path = require('path');
import config = require('config');
import { merge } from 'webpack-merge';

module.exports = merge(require('./webpack.react'), {
  entry: './src/web/index.tsx',
  target: '',
  output: {
    path: path.resolve('build/web'),
  },
  devServer: {
    port: config.get(),
  },
} as import('webpack').Configuration);
