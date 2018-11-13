+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

### Variables

media
*type: string*

URL to content would want to embed in your page. This value would override `media_source`.
media_source
*type: string*

HTML code for your `iframe` or `embed`.

If `media` is set, this value would not be used.

#### responsive
*type: boolean*  
*default: true*

If set to `true`, `iframe` or `embed` would change their size, respecting page size and the `ratio` variable, also overriding `size` variable.  
If set to `false` however, `ratio` would be ignored and `size` would be used instead.

#### ratio
*type: 21by9, 16by9, 4by3, 1by1*
*default: 4by3*

If `responsive` is set to `false` then this value would be ignored.

#### size
*type: number*  
*default: 75*

Percentage value, forcing the fragment to be for example 75% of width of it's parent.

If `responsive` is set to `true` then this value would be ignored.

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
