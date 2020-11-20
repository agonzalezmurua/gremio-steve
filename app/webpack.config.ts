/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const config = require("config");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageName = path.basename(__dirname);
const rootPath = path.resolve(__dirname, "../..");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "index.js",
    path: path.resolve(rootPath, "dist", packageName),
  },
  devServer: {
    contentBase: path.join(rootPath, "dist", packageName),
    compress: true,
    port: config.get("app.dev.port"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
            plugins: ["macros", "babel-plugin-styled-components"],
          },
        },
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      path: false,
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"),
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/template.html"),
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
