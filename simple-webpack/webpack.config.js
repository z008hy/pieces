const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist/'),
    clientLogLevel: 'warning',
    disableHostCheck: true,
    port: 8000,
    hot: true,
    contentBase: false,
    compress: true,
    quiet: true
  }
}