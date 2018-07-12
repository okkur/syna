const path = require('path');
const { plugins, rules } = require('./config/webpack');

if (process.env === 'production') {
  plugins.push(extractSass);
}

module.exports = {
  entry: {
    main: './static-main/js/index.js',
    contact: './static-main/js/contact.js',
    hero: './static-main/js/hero.js',
    portfolio: './static-main/js/portfolio.js',
  },
  output: {
    path: path.resolve('./static/'),
    filename: '[id].js'
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
