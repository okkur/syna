+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

### Variables

#### buttons
*type: array of objects*

You can add as many buttons as you want.

##### buttons.text
*type: string*
*required*

Title of the call to action button.

##### buttons.url
*type: string*
*default: "#"*

URL of the call to action button.

##### buttons.color
*type: primary, secondary, success, danger, warning, info, light, dark, link. Can be prefixed by `outline-` for outlined buttons.*
*default: "primary"*

Color class of the button, based on Bootstrap classes. 

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
