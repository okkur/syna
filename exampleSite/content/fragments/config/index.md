+++
fragment = "content"
weight = 100

title = "Config"
background = "light"
+++

Add additional `meta` tags, `link` tags and `script` tags to page.

<!--more-->

This fragment, unlike most other fragments, doesn't render anything (so it wouldn't need a `weight` variable).

If a config fragment is registered on a page, it's configuration values are considered and added before the `</body>` tag (default) or at the end of `<head>` tag.

Acceptable config types are `meta`, `icon`, `css` and `js`. Each config can contain either `html` or `resource` (except for `meta` type which only accepts `html` and is added as a `<meta>` tag to the `<head>` of the document). `resource` can accept either a file path (relative to `static/` directory) or a URL. This will then be added to a `<link>` or `<script>` tag based on the `type` value.

This example adds [Bootstrap color scheme](https://bootswatch.com/4/united/bootstrap.min.css) (`link`) to the page.

You can use this fragment to add custom scripts for different pages, or different sections or all of the pages together (through the [`_global`](/docs/fragments/#global-fragments) directories).
