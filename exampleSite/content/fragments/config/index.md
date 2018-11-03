+++
fragment = "content"
title = "Config"
weight = 100
+++

Add additional `meta` tags, `link` tags and `script` tags to page.

<!-- more -->

This fragment, unlike most other fragments, doesn't render anything (so it wouldn't need a `weight` variable).

When this fragment is registered in a page, it's variables are taken into account and applied in the `head` tag and right before `</body>`.
The decision on where to add links and scripts is based on usual HTML principles. `link` tags mostly contain stylesheets or links that need to be considered before page is rendered (styles, favicons, etc.). But scripts are added at the end of the page. You can change this behvaior by changing `block` variable.

All three array (`meta`, `link`, `script`) accept an `html` variable. Please add content to them respectively since there is some logic bound to each variable.

The example on this page contains a code to change the curstor (`script`) and a [Bootstrap color scheme](https://bootswatch.com/4/united/bootstrap.min.css) (`link`)
