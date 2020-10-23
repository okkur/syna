const path = require('path');

module.exports = {
  entry: {
    counter: './static-main/js/counter.js',
  },
  output: {
    path: path.resolve('./static/'),
    filename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(process.cwd(), 'src'), 'node_modules'],
  },
  mode: process.env === 'production' ? 'production' : 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
    }],
  },
  plugins: [],
};
