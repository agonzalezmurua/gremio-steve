const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ConfigWebpackPlugin = require('config-webpack');

const Configuration: import('webpack').Configuration = {
  cache: true,
  mode: 'development',
  output: {
    publicPath: '/',
    filename: 'index.js',
  },
  devServer: {
    contentBase: 'dist',
    compress: true,
    historyApiFallback: true,
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
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [new ConfigWebpackPlugin(), new FriendlyErrorsWebpackPlugin()],
};

module.exports = Configuration;
