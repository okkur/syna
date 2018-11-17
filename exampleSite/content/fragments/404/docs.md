+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

404 fragment looks a lot like `hero` fragment, with default call to action button to redirect the page and description in addition to subtitle and title.

In order to customize the fragment, which only appears in 404 page, you have to place it in your `/content/_global` directory.

### Variables

#### redirect_text
*type: string*
*default: i18n "404.direction"*

Description of the page.

#### button_text
*type: string*
*default: i18n "404.button"*

URL for the call to action button.

#### redirect_url
*type: string*
*default: "/"*

Title of the call to action button.

#### asset
*type: asset object*

The asset will be displayed on top of the fragment, before title and subtitle.

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.