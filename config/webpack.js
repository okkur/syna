const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractSass = new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "[id].css"
});

const sassLoader = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader"
    },
    {
      loader: "sass-loader"
    }
  ],
};

module.exports = {
  rules: [sassLoader],
  plugins: [extractSass],
};
