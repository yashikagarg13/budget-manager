const Path = require("path");


const config = {
  context: __dirname,
  entry: "./scripts/app.js",
  output: {
    path: Path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', 'jsx', '.json']
  },
  module: {
    /*preLoaders: [
      {test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/}
    ],*/
    loaders: [
      {test: /\.jsx?$/, loader: "babel-loader"},
      {test: /\.json$/, loader: "json-loader"}
    ]
  }
};

module.exports = config;
