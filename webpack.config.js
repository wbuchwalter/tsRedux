var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var _ = require('lodash');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', 'src/app.ts'],
    vendor: [
      "angular",      
      "redux"     
    ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),   
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello World',
      inject: true,
      template: './index.html'
    })
  ],

  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },

  devtool: 'source-map',

  module: {   
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript' },    
      { test: /\.html$/, loader: 'html' },
      { test: /rules.json/, loader: 'raw' },
      { test: /data.json/, loader: 'json' }
    ]
  }
  
};
