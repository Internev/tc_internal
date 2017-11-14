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
      exclude: /node_modules/,
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
    },
    // {
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         query: {
    //           name: '[name].[ext]'
    //         }
    //       }
    //     },
    //     {
    //       loader: 'image-webpack-loader',
    //       options: {
    //         query: {
    //           mozjpeg: {
    //             progressive: true
    //           },
    //           gifsicle: {
    //             interlaced: true
    //           },
    //           optipng: {
    //             optimizationLevel: 7
    //           }
    //         }
    //       }
    //     }]
    // }
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
