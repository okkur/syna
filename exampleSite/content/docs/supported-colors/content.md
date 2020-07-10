+++
fragment = "content"
weight = 100

title = "Supported Colors"

[sidebar]
  sticky = true
+++

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
