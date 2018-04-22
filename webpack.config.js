const path = require('path');
const { plugins, rules } = require('./config/webpack')

if (process.env === 'production') {
  plugins.push(extractSass);
}

module.exports = {
  entry: ['./static-main/js/index.js'],
  output: {
    path: path.resolve('./static/'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.join(process.cwd(), 'src'), 'node_modules'],
  },
  mode: process.env === 'production' ? 'production' : 'development',
  module: {
    rules,
  },
  plugins,
};
