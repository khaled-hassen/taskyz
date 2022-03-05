const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/server.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: [".ts", ".js"] },
  output: { filename: "bundle.js", path: path.resolve(__dirname, "build") },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  node: { __dirname: false, __filename: false },
  optimization: { minimize: true, minimizer: [new TerserPlugin()] },
};
