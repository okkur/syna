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

Syna is a Hugo template built to be customizable and easy to use. To achieve this we have built it in a way that all the pages would be created by using building blocks
called fragments. Each page of a website using Syna is created using fragments.

## Fragments

Fragments are the way you build your site. Each site is made up of one or multiple fragments. These can be a navigation fragment, a content fragment and more.

Multiple pre-bundled fragments are available. You can add your own custom fragment by creating a new file in `layouts/partials/fragments` directory (create the path if it does not exist) in your website's working directory.

For fragments of a site, that need to show up on every page, we have global fragments. These fragments are controlled with page resources or fragments defined in a headless page called global which would be rendered in all pages.  
You can selectively overwrite a global fragment on each page. Create a fragment with the same filename as the global one and it will be overwritten within this page.

Fragments themselves are [partials](https://gohugo.io/templates/partials/) that are located in `layouts/partials/fragments` (whether in your website's working directory or Syna's directory, checkout [Hugo's template lookup order](https://gohugo.io/templates/lookup-order/)). When a page is being rendered and is using the default layout `single` (no need to be explicitly mentioned in the page bundle), Syna would do the following:

- `head.html` partial is rendered from `baseof.html` layout
- `single.html` layout is rendered
  - The layout will find all the page resources and collect the fragments (located in `content/[page]`)
  - The layout will find all the global page's resources and collect the fragments (located in `content/global`)
  - The layout will render global fragments if there is no local fragment with the same file name
  - The layout will render all the local fragments
  - The layout will sort all the fragments based on their `weight` attribute
- `js.html` partial is rendered from `baseof.html` layout

Each fragment is controlled by a content file, which is usually located next to the page's index.md file.  
For bundling images a fragment can also be created as a subdirectory next to the page's index.md file.  
That file should contain at least the following:

```
+++
date = "1970-01-01"
fragment = "[The fragment you want to use]"
weight = 10
+++
```

The parameters and content of this file are passed to the fragment you mention within the fragment variable. The content will therefore be rendered in the page using the specified fragment.  
Using the weight variable you can specify the place on the page the fragment is rendered.

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

In order to create a new fragment for you website create a new `html` named after your fragment and place it under `[project_root]/layouts/partials/fragments`. Fragments are partials and follow the same rules. If you are not familiar with partials please read their [documentation](https://gohugo.io/templates/partials/).

### Image resource fallthrough

Some fragments (`hero` fragment for example) may display images, if configured in their content files. The configuration always accepts a filename and the fragment would look for a file with that name in the following order.

- If the content file controlling the fragment is located in it's own directory (`content/[page]/[fragment]/[filename].md`), fragment will look for a file with the name specified in that content in that directory.
- If the specified file is not found in that directory or the controlling content is in page directory, fragment will look in that page directory as well.
- If the file is not found in the page directory the fragment will look in images directory for that file.

So the fragment will look in the following order `fragment > page > images (global)`. If you need to use an image in several pages you can put it in the `static/images` directory and the image would be avilable globally. But if an image may differ between two pages or even two fragments of same type, it's possible to have it using this mechanism.

### Short-comings

As mentioned, fragments are controlled by content files. There is one exception and that is menus. Hugo does not allow menus to be defined in content files. In order to customize menu options for a fragment you need to configure them `config.toml` of your website. As of right now only there are three fragments using menus:

- nav fragment: Uses `menu.prepend`, `menu.main` and `menu.postpend`c
- footer fragment: Uses `menu.footer` and `menu.footer_social`
- copyright fragment: Uses `menu.copyright_footer`

> Whenever Hugo allows for resource menus or when we figure out a way to have menu features with frontmatter arrays this would change and menus would be configurable with resource variables like everything else. The change would be breaking. So when updating the theme please read the changelog and check for breaking changes.

```
If there is something that's not documented, create a new issue or contribute it.

See how you can contribute with our [contribution guide](/CONTRIBUTING.md).
```
