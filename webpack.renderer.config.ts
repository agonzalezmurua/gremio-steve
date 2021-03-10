import webpack = require('webpack');
import { merge } from 'webpack-merge';
import path from 'path';

const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ConfigWebpackPlugin = require('config-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) =>
  ({
    entry: './src/renderer/index.tsx',
    cache: true,
    output: {
      filename: 'index.js',
      path: path.resolve('build/renderer'),
    },
    devServer: {
      contentBase: 'dist',
      compress: true,
      historyApiFallback: true,
      port: config.get('webpack.dev_server.port'),
      proxy: {
        '/api': {
          target: 'http://localhost:3010',
          pathRewrite: { '^/api': '' },
        },
      },
    },
    devtool: 'inline-source-map',
    node: {
      __filename: true,
      __dirname: true,
      global: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src'),
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
                [
                  '@babel/preset-typescript',
                  {
                    allowNamespaces: true,
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                'macros',
                'babel-plugin-styled-components',
                [
                  'react-intl',
                  {
                    idInterpolationPattern: '[sha512:contenthash:base64:6]',
                    extractFromFormatMessageCall: true,
                    ast: true,
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          include: path.resolve(__dirname, 'src/renderer/assets'),
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'src/renderer/assets'),
          use: ['@svgr/webpack'],
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
      new CleanWebpackPlugin(),
      new ConfigWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/renderer/App.html',
        filename: 'index.html',
        title: 'Gremio Steve',
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  } as import('webpack').Configuration);
