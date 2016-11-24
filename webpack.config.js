const webpack = require('webpack');
const Path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  context: __dirname,
  entry: "./src/app.js",
  output: {
    path: Path.join(__dirname, "public/js"),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    /*preLoaders: [
      {test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/}
    ],*/
    loaders: [
      {test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/},

      // CSS: https://github.com/webpack/css-loader
      {test: /\.(css(\?.*)?)$/, loader: ExtractTextPlugin.extract('style', 'css')},

      // LESS: https://github.com/webpack/less-loader
      {test: /\.(less(\?.*)?)$/, loader: ExtractTextPlugin.extract('style', 'css!less')},

    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    }),
    new ExtractTextPlugin("style.css"),
  ]
};

module.exports = config;
