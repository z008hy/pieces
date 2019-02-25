const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer]
  }
}

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader?minimize=true', postcssLoader]
          })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader?minimize=true', postcssLoader, 'sass-loader']
          })
      },
      {
        test: /\.(jpg|png|gif|ico)(\?.*)?(#.*)?$/,
        loader: 'url-loader',
        query: {
          name: '[name].[ext]',
          limit: 4096
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)(\?.*)?(#.*)?$/,
        loader: 'file-loader',
        query: {
          // name: env.LOCAL ? '[name].[ext]' : '[name].[hash].[ext]'
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   comments: false,
    //   sourceMap: false,
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     collapse_vars: true,
    //     reduce_vars: true
    //   }
    // }),
    new ExtractTextPlugin('index.css')
  ]
};