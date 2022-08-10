module.exports = {
  mode: 'production',
  output: {
    filename: "[name].[contenthash].js"
  },
  plugins: [
    new DefinePlugin({
      //!!!! define api endpoints, secret keys etc, or use dotenv plugin
      'process.env.name': JSON.stringify('test prod'),
    }),
  ],
}
