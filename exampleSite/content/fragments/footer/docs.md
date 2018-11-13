+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

### Menus

- .Site.Menus.footer
- .Site.Menus.footer_social

### Variables

#### menu_title
*type: string*

Title of the menu displayed in the footer.

#### asset
*type: asset object*

The asset will be displayed on top left of the fragment and can be used for logo.

From global variables, `subtitle` and `title_align` don't work in this fragment since title works differently and there is no subtitle.

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
