const path = require('path');
const { plugins, rules } = require('./config/webpack');

if (process.env === 'production') {
  plugins.push(extractSass);
}

module.exports = {
  entry: {
    main: './assets/js/index.js',
    contact: './assets/js/contact.js',
    hero: './assets/js/hero.js',
    portfolio: './assets/js/portfolio.js',
  },
  output: {
    path: path.resolve('./static/'),
    filename: '[id].js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.join(process.cwd(), 'src'), 'node_modules'],
  },
  mode: process.env === 'production' ? 'production' : 'development',
  module: {
    rules,
  },
  plugins,
};
