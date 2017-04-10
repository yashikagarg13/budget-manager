const webpack = require('webpack');
const Path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = Path.join(__dirname, "src");
const PUBLIC_DIR = Path.join(__dirname, "public");
const NODE_MODULES = Path.join(__dirname, "node_modules");

const config = (env) => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);
  return {
    context: SRC_DIR,
    entry: {
      app: "./app.js",
      vendor: ["react", "react-dom", "react-router", "ramda", "react-bootstrap", "moment", "react-datepicker",
                "react-waypoint", "d3", "axios", "localStorage", "jsonwebtoken", "bcrypt-nodejs"],
    },
    output: {
      path: Path.join(__dirname, "public/"),
      publicPath: "/",
      filename: "js/[name].[chunkhash].js",
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {test: /\.jsx?$/, use: [{loader: "eslint-loader"}], exclude: /node_modules/, enforce: "pre"},

        {test: /\.jsx?$/, use: [{loader: "babel-loader"}], exclude: /node_modules/},

        // CSS: https://github.com/webpack/css-loader
        {
          test: /\.(css(\?.*)?)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
          }),
        },

        // LESS: https://github.com/webpack/less-loader
        {
          test: /\.(less(\?.*)?)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"],
          }),
        },

        // Images
        {test: /\.(jpe?g|png|gif|svg(\?.*)?)$/i,
          use: [{
            loader: "file-loader",
            options: {
              hash: "sha512",
              digest: "hex",
              name: "[hash].[ext]",
            }
          }, {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
            }
          }]
        },

        {test: /\.(ttf(\?.*)?)$/,   use: [{loader: "file-loader", options: {"name": "[name].[ext]"}}]},
        {test: /\.(woff(\?.*)?)$/,  use: [{loader: "file-loader", options: {"name": "[name].[ext]"}}]},
        {test: /\.(woff2(\?.*)?)$/, use: [{loader: "file-loader", options: {"name": "[name].[ext]"}}]},
        {test: /\.(eot(\?.*)?)$/,   use: [{loader: "file-loader", options: {"name": "[name].[ext]"}}]},
      ]
    },
    plugins: removeEmpty([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'js/[name].js',
      }),
      new CleanWebpackPlugin(['public'], {
        root: Path.join(__dirname, "/"),
        verbose: true,
        dry: false
      }),
      new ExtractTextPlugin({
        filename: "style.css",
        disable: false,
        allChunks: true,
      }),
      new HTMLWebpackPlugin({
        template: "./index.html",
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify("production")
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true},
        sourceMap: true,
      })),
    ])  ,
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  }
};

module.exports = config;
