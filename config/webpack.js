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

module.exports = {
  rules: [jsLoader],
  plugins: [],
};
