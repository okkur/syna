const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './static-main/js/index.js',
    contact: './static-main/js/contact.js',
    editor: './static-main/js/editor.js',
    hero: './static-main/js/hero.js',
    portfolio: './static-main/js/portfolio.js',
  },
  output: {
    path: path.resolve('./static/'),
    filename: 'syna-[id].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.sass', '.scss'],
    modules: [path.join(process.cwd(), 'src'), 'node_modules'],
  },
  mode: process.env === 'production' ? 'production' : 'development',
  module: {
    rules: [{
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
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
        },
      },
    }, {
      test: /\.(woff|woff2|eot|svg|ttf)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 50000,
          name: "./fonts/[name].[ext]",
        },
      },
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
};
