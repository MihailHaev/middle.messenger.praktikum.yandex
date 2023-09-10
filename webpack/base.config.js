const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { getPath, OUTPUT_DIR } = require('./helpers');
require('dotenv').config({ path: getPath('.env') });

module.exports = {
  entry: getPath('src/index.ts'),
  plugins: [
    new HtmlWebpackPlugin({
      template: getPath('static/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    path: OUTPUT_DIR,
    filename: 'project-name.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css'],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js',
      '@': getPath('src'),
    },
    fallback: {
      'fs': false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: getPath('tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        exclude: /(node_modules)/,
      },
    ],
  },
};
