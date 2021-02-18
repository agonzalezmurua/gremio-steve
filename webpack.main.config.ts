const webpack = require('webpack');
const path = require('path');
const ConfigWebpackPlugin = require('config-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = [
  {
    cache: true,
    entry: './src/main/index.ts',
    output: {
      filename: 'main.js',
      path: path.resolve('build'),
    },
    target: 'electron-main',
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '3',
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve('./src/renderer/tsconfig.json'),
        }),
      ],
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
