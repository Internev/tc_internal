const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [path.join(__dirname, '/client/main.js')],
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(csv-parse)\/).*/,
      use: [
        'babel-loader'
      ]
    },
    {
      test: /\.s?css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
      favicon: 'favicon.ico'
    })
  ]
}
