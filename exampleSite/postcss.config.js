const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids, [
      'active',
      'show',
      'in',
    ]);
  },
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : []),
  ],
};
