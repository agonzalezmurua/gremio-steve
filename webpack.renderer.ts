import webpack = require('webpack');
import { merge } from 'webpack-merge';

const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = merge(require('./webpack.react'), {
  entry: './src/renderer/index.tsx',
  output: {
    path: path.resolve('build/renderer'),
  },
  devServer: {
    port: config.get('webpack.dev_server.port'),
  },
  devtool: 'inline-source-map',
  node: {
    global: true,
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve('./src/renderer/tsconfig.json'),
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/renderer/App.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
} as import('webpack').Configuration);
