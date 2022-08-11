const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`)

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  devtool: isDev ? 'cheap-module-source-map' : false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new CleanWebpackPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    isDev && new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: isDev,
    open: isDev,
  },
}
