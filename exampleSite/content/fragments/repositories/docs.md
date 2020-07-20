+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  sticky = true
+++

### Variables

#### user
*type: string*

The username of the user you want the repositories of.

#### count
*type: number*
*default: 1000*

The number of repositories that will be rendered.

#### sort
*type: number*
*default: updated_at*

The variable name to use for sorting repositories. 

**Note:** The variable name is a key in the response of Github's repositories API. Also the sort is done using Hugo's `sort` function.

[Global variables]({{< ref "global-variables" >}}) are documented as well and have been omitted from this page.
