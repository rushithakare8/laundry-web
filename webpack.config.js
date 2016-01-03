'use strict'

let paths = require('./configs/paths.json')

module.exports = {
  context: __dirname,
  entry: paths.react.main,
  output: {
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.jsx', '.js', '.json']
  },
  externals: {
    'react-router': 'ReactRouter',
    'react-dom': 'ReactDOM',
    'jquery': 'jQuery',
    'react': 'React',
    'lodash': '_',
  },
  debug: true
}
