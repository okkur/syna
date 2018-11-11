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

#### sidebar
*type: object*

If this object is present in fragment configuration a sidebar would appear next to the fragment.

**NOTE:** If sidebar is active the `sidebar` slot would also be active.

##### title
*type: string*

##### align
*type: left, right*  
*default: left*

Sets the alignment of sidebar on the page.

##### content
*type: string*

Markdown enabled content that would be rendered in the sidebar.

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
