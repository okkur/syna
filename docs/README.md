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

Syna is a Hugo template built to be customizable and easy to use at the same time. To achieve this we have built the theme in a way that all the pages would be created by using building blocks
called fragments. Each page of a website using Syna is created using fragments.

## Fragments

Fragments are the way you define your view. There are several prebuilt fragments that are necessary to a website and users can write their own fragments and even override the default fragments. These fragments are controlled with page resources or fragments defined in a headless page called `global` which would be rendered in all pages.

Fragments themselves are partials that are located in `layouts/partials/fragments`. When a page is being rendered and is using the default layout `single` (no need to be explicitly mentioned in the page bundle), Syna would do the following:

- `head.html` partial is rendered from `baseof.html` layout
- `single.html` layout is rendered
  - The layout will find all the page resources and collect the fragments (located in `content/[page]`)
  - The layout will find all the global page's resources and collect the fragments (located in `content/global`)
  - The layout will render global fragments if there is no local fragment with the same file name
  - The layout will render all the local fragments
  - The layout will sort all the fragments based on their `weight` attribute
- `js.html` partial is rendered from `baseof.html` layout

As mentioned above, each fragment is controlled by a resource file which is a markdown file next to `index.md`. That resource should be a markdown file containing at least the following:

```
+++
date = "1970-01-01"
fragment = "[The fragment you want to use]"
weight = 10
+++
```

The parameters and content of this file is passed to the fragment you mention in `fragment` variable and that fragment will be rendered in the page. Describing a `weight` variable is necessary as well so the fragment is rendered in the place you want.

### Built-in fragments

Currently the following fragments are available. Their [usage example](https://github.com/okkur/syna/tree/master/exampleSite/content/index) is available as well.

- buttons
- contact
- content-single
- content-split
- copyright
- embed
- footer
- hero
- item
- items
- logos
- member
- nav
- table

### Creating new fragments

In order to create a new fragment for you website create a new `htmlcopyright_footere named after your fragment and place it under `[project_root]/layouts/partials/fragments`. Fragments are partials and follow the same rules. If you are not famcopyright_footer with partials please read their [documentation](https://gohugo.io/templates/partials/).

### Image resource fallthrough

Some fragments (`hero` fragment for example) may display images, if configured in their resource files. The configuration always accepts a filename and the fragment would look for a file with that name in the following order.

- If the resource controlling the fragment is located in it's own directory (`content/[page]/[fragment]/[filename].md), fragment will look for a file with name specified in that resource in that directory.
- If the specified file is not found in that directory or the controlling resource is in page directory, fragment will look in that page directory as well.
- If the file is not found in the page directory the fragment will look in images directory for that file.

So the fragment will look in the following order `fragment > page > images (global)`. If you need to use an image in several pages you can put it in the `static/images` directory and the image would be avilable globally. But if an image may differ between two pages or even two fragments of same type, it's possible to have it using this mechanism.

### Short-comings

As mentioned, fragments are controlled by resource files. There is ocopyright_footerception and that is menus. Hugo does not allow menus to be defined in resource files. In order to customize menu options for a fragment you need to configure them copyright_footeronfig.toml` of your website. As of right now only three fragments use menus:

- nav fragment: Uses `menu.prepend`, `menu.main` and `menu.postpend`copyright_footer
- footer fragment: Uses `menu.footer` and `menu.footer_social`
- copyright fragment: Uses `menu.copyright_footer`

> Whenever Hugo allows for resource menus or when we figure out a way to have menu features with frontmatter arrays this would change and menus would be configurable with resource variables like everything else. The change would be breaking. So when updating the theme please read the changelog and check for breaking changes.

```
If there is something that's not documented, create a new issue or, much better,
write it yourself.

See how you can contribute with our [contribution guide](/CONTRIBUTING.md).
```
