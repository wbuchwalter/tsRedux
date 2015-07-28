var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/app.ts'],
    vendor: ['angular', 'reflect-metadata', 'lodash']
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),   
    new webpack.HotModuleReplacementPlugin()
    //  new HtmlWebpackPlugin({
    //   title: 'tsRedux',
    //   inject: true,
    //   template: 'index.html'
    // })
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
