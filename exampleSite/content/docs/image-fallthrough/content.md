+++
fragment = "content"
weight = 100

title = "Image Resource Fallthrough"

[sidebar]
  enable = true
+++

Some fragments (`hero` fragment for example) may display images, if configured in their content files. The configuration always accepts a filename and the fragment would look for a file with that name in the following order.

- If the content file controlling the fragment is located in it's own directory (`content/[page]/[fragment]/[filename].md`), fragment will look for a file with the name specified in that content in that directory.
- If the specified file is not found in that directory or the controlling content is in page directory, fragment will look in that page directory as well.
- If the file is not found in the page directory the fragment will look in images directory for that file.

So the fragment will look in the following order `fragment > page > images (global)`. If you need to use an image in several pages you can put it in the `static/images/` directory and the image would be available globally. But if an image may differ between two pages or even two fragments of same type, it's possible to have it using this mechanism.

Syna supports custom favicons in config.toml allowing for ICO, PNG or SVG image formats. In order to use one of the custom favicon formats, you can specify the image file name in config.toml and save the image file in the '/static' directory.
