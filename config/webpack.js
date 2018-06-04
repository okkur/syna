const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractSass = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
});

const sassLoader = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ],
};

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
    },
  },
};

const fileLoader = {
  test: /\.(woff|woff2|eot|svg|ttf)$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 50000,
      name: "./fonts/[name].[ext]",
    },
  },
};

module.exports = {
  rules: [sassLoader, jsLoader, fileLoader],
  plugins: [extractSass, ],
};
