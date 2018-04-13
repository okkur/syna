const path = require('path');
const { plugins, rules } = require('./config/webpack')

if (process.env === 'production') {
  plugins.push(extractSass);
}

module.exports = {
  entry: ['./static-main/styles/index.scss'],
  output: {
    path: path.resolve('./static/'),
    filename: '[name].min.js',
  },
  mode: process.env === 'production' ? 'production' : 'development',
  module: {
    rules,
  },
  plugins,
};
