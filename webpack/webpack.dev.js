const { DefinePlugin } = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevServer = process.argv.some((v) => v.includes('serve'))

module.exports = {
  mode: 'development',
  output: {
    filename: `[name].js`
  },
  //CRA recommends this option
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: isDevServer,
    open: isDevServer,
  },
  plugins: [
    new DefinePlugin({
      //!!!! define api endpoints, secret keys etc, or use dotenv plugin
      'process.env.name': JSON.stringify('test var'),
    }),
    //instead HMR, hot reload only changed component, saving state of others
    isDevServer && new ReactRefreshWebpackPlugin(),
    //filter clears booleans, when condition is false
  ].filter(Boolean),
}
