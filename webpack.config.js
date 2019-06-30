const path = require('path');

module.exports = {
  entry: "./src/app.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/ar-base/"
  },
  devtool: "sourcemap"
};
