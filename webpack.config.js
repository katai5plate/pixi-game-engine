const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts"
  },
  optimization: {
    splitChunks: {
      maxSize: 1310000, // 分割サイズ
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
      },
      {
        test: /\.css$/,
        use: "css-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|ogg|mp3|wav|mpe?g|webm)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
