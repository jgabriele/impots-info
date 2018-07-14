const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    bundle: './app/index.js',
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     App: path.resolve(__dirname, 'app/'),
  //     Components: path.resolve(__dirname, 'app/components/'),
  //     Pages: path.resolve(__dirname, 'app/pages/'),
  //     Server: path.resolve(__dirname, 'app/server/'),
  //     State: path.resolve(__dirname, 'app/state/')
  //   }
  // }
}
