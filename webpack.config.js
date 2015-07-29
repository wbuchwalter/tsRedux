var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/app.ts'],
    vendor: ['jquery', 'angular', 'reflect-metadata', 'lodash', 'redux', 'reselect', 'ng-redux']
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
    hash: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'tsRedux',
      template: './index.html',
      inject: 'body'      
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },

  devtool: 'source-map',

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'simple-typescript' },
      { test: /\.html$/, loader: 'html' },
      { test: /rules.json/, loader: 'raw' },
      { test: /\.json$/, loader: 'json' }
    ]
  }

};
