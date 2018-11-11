+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

### Variables

#### buttons
*Type: array of objects*

You can add as many buttons as you want.
##### buttons.text
*Type: string*
*Required*

Title of the call to action button.

##### buttons.url
*Type: string*
*Default: "#"

URL of the call to action button.

##### buttons.color
*Type: primary, secondary, success, danger, warning, info, light, dark, link. Can be prefixed by `outline-` for outlined buttons.*
*Default: "primary"*

Color class of the button, based on Bootstrap classes. 

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
