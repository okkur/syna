+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

This fragment needs a fragment controller file and subitems. You need to create a directory for this fragment and put `index.md` with `fragment = "pricing"` and subitems next to that file.

### Variables

`index.md` doesn't use any variables. Following variables are for subitems.

#### price
*type: string*

#### highlight
*type: boolean*  
*default: false*

If set to `true`, the column will have more `z-index`, width and stay a bit on top of other columns.

#### button_text
*type: string*

Title of the button on the column.

#### button_url
*type: string*

URL of the button on the column.

#### features
*type: array of objects*

This array will be displayed on the pricing column, listing what is aviable in the current plan.

##### features.text
*type: string*

##### features.icon
*type: string*

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
