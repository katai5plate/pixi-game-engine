const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts"
  },
  optimization: {
    splitChunks: {
      // maxSize: 1000000, // 分割サイズ
      name: "libs",
      chunks: "initial"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hello, PixiJS!"
    })
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
