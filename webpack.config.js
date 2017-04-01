const webpack = require('webpack');
const Path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = Path.join(__dirname, "src");
const PUBLIC_DIR = Path.join(__dirname, "public");
const NODE_MODULES = Path.join(__dirname, "node_modules");

const config = {
  context: __dirname,
  entry: "./src/app.js",
  output: {
    path: Path.join(__dirname, "public/"),
    publicPath: "/",
    filename: "js/bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/},

      // CSS: https://github.com/webpack/css-loader
      {test: /\.(css(\?.*)?)$/, loader: ExtractTextPlugin.extract('style', 'css')},

      // LESS: https://github.com/webpack/less-loader
      {test: /\.(less(\?.*)?)$/, loader: ExtractTextPlugin.extract('style', 'css!less')},

      // JSON
      {test: /\.(json(\?.*)?)$/,  loaders: ["json-loader"]},

      // Images
      {test: /\.(jpe?g|png|gif|svg(\?.*)?)$/i,
        loaders: ["file?hash=sha512&digest=hex&name=[hash].[ext]",
                  "image-webpack?bypassOnDebug"]},

      {test: /\.(ttf(\?.*)?)$/,   loaders: ["file?name=[name].[ext]"]},
      {test: /\.(woff(\?.*)?)$/,  loaders: ["file?name=[name].[ext]"]},
      {test: /\.(woff2(\?.*)?)$/, loaders: ["file?name=[name].[ext]"]},
      {test: /\.(eot(\?.*)?)$/,   loaders: ["file?name=[name].[ext]"]},
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: Path.join(__dirname, "/"),
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, screw_ie8: true},
    }),
    new ExtractTextPlugin("style.css"),
    new HTMLWebpackPlugin({
      template: SRC_DIR + "/index.html",
    })
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};

module.exports = config;
