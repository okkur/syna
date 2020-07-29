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
*default: 4*

The number of repositories that will be rendered.

#### display_forks
*type: boolean*  
*default: false*

Determines whether or not forked repositories will be shown.

#### sort
*type: string*
*default: stargazers_count*

This key is used to sort the repositories.

**Note:** This value is a key from the response of Github's repositories API. Also the sort is done using Hugo's `sort` function.

#### allowlist
*type: array of string*

A filter that is applied to repository names. Only repositories that are named in this list will be rendered.

[Global variables]({{< ref "global-variables" >}}) are documented as well and have been omitted from this page.
