+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

### Slots

- `sidebar`: Only active if `sidebar` is set.
- `before-content`
- `after-content`

### Variables

#### summary
*type: string*

The value is not required, but if set the summary displayed in the List fragment would use this value.

#### asset
*type: asset object*

This value will render an image on top of the content.

#### display_date
*type: boolean*
*default: false*

#### sidebar
*type: object*

If this object is present in fragment configuration a sidebar would appear next to the fragment.

**NOTE:** If sidebar is active the `sidebar` slot would also be active.

##### sidebar.title
*type: string*

##### sidebar.align
*type: left, right*  
*default: left*

Sets the alignment of sidebar on the page.

##### sidebar.content
*type: string*

Markdown enabled content that would be rendered in the sidebar.

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
