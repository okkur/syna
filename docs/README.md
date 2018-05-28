<!--
Copyright 2017 - The Syna Theme Authors

This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License;
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://creativecommons.org/licenses/by-sa/4.0/legalcode
Unless required by applicable law or agreed to in writing, documentation
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# Documentation

> Highly customizable open source theme for Hugo based static websites

Syna is a Hugo template based on fragments. That means if you want to create
a page there is no need to write any HTML. Just create a new directory in
`content/` and add `index.md` as usual. Then you can add new markdown files that
would control fragments and would be displayed on the page.

Everything in Syna is set to be configurable. All fragments can be overwritten
and CSS/JS files can be disabled or changed if you don't want them or want to
use your own version.

The rest of this document will go into what are the building blocks of Syna
and how it can be used and customized.

## Fragments

Fragments are the building blocks of each page. Everything in Syna is rendered
using fragments. Fragments are special partial files and follow the same ruels
as them. You can create new fragments by creating a new `.html` file in `layouts/partials/fragments`. All the fragments are accessible by creating a new
`.md` file in your page's directory and adding a new frontmatter variable called
`fragment` and assigning the name of the fragment you want to use to that
variable.

When a new page is going to be rendered, Syna would check if there are any
files in the page directory that have `fragment` variable inside them. If so the
fragment is loaded and rendered using the variables inside that file. Also Syna
would check for any global fragments located in `content/global`. If there are
any global fragments and there are no local fragments with the same name the
global fragment is rendered.

Let's look at an example:

**About page:**

*`content/global/nav.md`*
```
+++
fragment = "nav"
#disabled = true
date = "2018-05-17"
weight = 0
#background = ""

# Branding options
[branding]
  logo = "logo.svg"
  text = "Syna"

[repo_button]
  url = "https://github.com/okkur/syna"
  text = "Star" # default: "Star"
  icon = "fa-github" # defaults: "fa-github"
+++
```

*`content/global/footer.md`*
```
+++
fragment = "footer"
#disabled = true
date = "2016-09-07"
weight = 150
#background = ""

menu_title = "Link Title"

[logo]
    title = "Logo Title"
    image = "logo.svg"
    text = "Logo Subtext"
    link = "#"
+++
```

*`content/about/index.md`*
```
+++
title = "About Syna"
date = "2017-10-05"
+++
```

*`content/about/content.md`*
```
+++
fragment = "content-single"
#disabled = true
date = "2017-10-05"
weight = 100
#background = ""

title = "About Syna"
#subtitle = ""
+++
Open Source Theme from Okkur for your next project.
```

The files above would create a new page (`example.com/about`) that would show
a navbar, some content and a footer. Notice that footer and navbar are located
in `content/global` which indicate that these fragments are global and would
be displayed in all pages if those pages don't already have a fragment with
the same filename.

`index.md` is needed to create a new page. In all the files except `index.md`
there is a frontmatter variable called `fragment` which is used to determine
which fragment is going to be displayed using this file.

Each of these resources control the fragment they are calling using their
frontmatter variables. The only thing not controlled by these resources are
menus. For example `nav` fragment has a section which displays the logo
described in `content/global/nav.md` using `branding.logo`. Menus however
are described in site's `config.toml` since Hugo does not allow menus in
resource files. Currently only `nav`, `footer` and `copyright` fragments use
menus and that will change in the future.

To see how each fragment performs check out our
[demo website](https://syna-demo.okkur.io) and see example codes.

```
If there is something that's not documented, create a new issue or, much better,
write it yourself.

See how you can contribute with our [contribution guide](/CONTRIBUTING.md).
```
