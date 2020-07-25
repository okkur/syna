+++
fragment = "content"
weight = 100

title = "Supported Colors"

[sidebar]
  sticky = true
+++

### Supported Colors

Fragments and various elements can be customized further using Bootstrap color classes.
These colors are customized within `config.toml` to fit the Syna theme.

| class     | colors  |
| --------- | ------- |
| primary   | #00838F |
| secondary | #868e96 |
| success   | #008f54 |
| info      | #00838F |
| warning   | #fdf314 |
| danger    | #dc1200 |
| light     | #f8f9fa |
| dark      | #343a40 |

In order to change the primary color, you can update the primary color within your `config.toml` file:

```toml
[params]
  [params.colors]
      primary = "#00838F"
```

Please note that `colors` is under `params` section of your configuration.

These colors are mainly used for backgrounds and button colors.  
By changing the colors, all fragment colors and backgrounds will be changed to the new colors. Links, inline code and other elements will also be changed.  
These colors can also be overwritten for more details see our [style documentation]({{< ref "development" >}}#styles).

**Important:** These colors define the color scheme that Bootstrap uses. As you update them, be careful to keep the contrast between different colors. Since it's not possible to recognize the contrast of colors within Syna, we rely on the names of colors when setting different text colors for different backgrounds. So if you change the `primary` color to a darker color, text colors will still use the `text-body` class from Bootstrap which is a dark color and may result in unreadable text.

### PostCSS

PostCSS is enabled by default and will look for its configuration file when Hugo is building your website. You can add your configuration to `postcss.config.js` at the root of your project. Here are some recommended configurations. Please note that you can combine these configurations and use them together.

#### Removing unused CSS

We recommend using `@fullhuman/postcss-purgecss` along PostCSS to remove unused CSS from your website. PurgeCSS will drastically reduce the size of your website. Since we use Bootstrap to develop our built-in fragments, the final CSS bundle is mostly Bootstrap code that goes unused. To remove the unused parts, please run:

- `npm install @fullhuman/postcss-purgecss` or `yarn add @fullhuman/postcss-purgecss`
- Add the following code to `<root-directory>/postcss.config.js`:

```javascript
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
```

### RTL stylesheet

Syna is created for LTR languages but changing the theme to accommodate RTL languages is quite easy. In order to change the direction of the stylesheet, please run the following command:

- `npm install rtlcss` or `yarn add rtlcss`
- Add the following code to `<root-directory>/postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    require('rtlcss')()
  ]
}
```
