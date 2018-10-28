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

Syna is a Hugo template built to be customizable and easy to use.
To achieve this we have built it in a way that all pages are created using building blocks called fragments.
Each page within a Syna based website is created using fragments.

<!-- TOC -->

- [Documentation](#documentation)
  - [Installation](#installation)
    - [Adding Syna to your site](#adding-syna-to-your-site)
    - [Using starter](#using-starter)
  - [Usage and concepts](#usage-and-concepts)
    - [Fragments](#fragments)
    - [Image resource fallthrough](#image-resource-fallthrough)
    - [Supported Colors](#supported-colors)
    - [Short-comings](#short-comings)
  - [Front-end development and design](#front-end-development-and-design)
    - [Styles](#styles)
    - [JavaScript](#javascript)
      - [React support](#react-support)
    - [Fragment implementation](#fragment-implementation)
    - [Creating new fragments](#creating-new-fragments)
  - [Further reading](#further-reading)

<!-- /TOC -->

## Installation

### Adding Syna to your site

You can use Syna by adding it as a submodule to your website repository and pointing the submodule to the latest release.
This way whenever you want to update the theme you can just pull the updates and checkout to the latest tag.

```bash
git submodule init # If you haven't initialized before
git submodule add https://github.com/okkur/syna.git themes/syna
cd themes/syna
git checkout v0.12.0 # Latest release as of now is v0.12.0
```

### Using starter

If you don't have a site yet, you can use our [starter](https://github.com/okkur/syna-start).
Using the starter you will have a sample page with several fragment examples and you can use them to start building your own website.

```bash
git clone --recurse-submodules https://github.com/okkur/syna-start.git # --recurse-submodules will clone the theme
cd syna-start
hugo server -D # to build your website, run hugo instead
```

## Usage and concepts

### Fragments

Fragments are the base building block of your website.
Each page is made up of one or multiple fragments. 
These can be a navigation fragment, a content fragment or more.

Multiple pre-bundled fragments are available.
You can add your own custom fragment by creating a new layout file within your websites's `layouts/partials/fragments/` directory.
If this path doesn't exist yet, you can create it beforehand.

For fragments of a website, that need to show up on every page, we have global fragments.
Global fragments are located in a special content directory `content/_global/`.
All fragments within this directory are rendered on all pages by default.
*To not render the whole page as a subpath of your website the index.md file defines the whole directory as a `headless` bundle*
To overwrite a global fragment create a per page fragment with the same filename.
This would overwrite the global one.

Each fragment is controlled by a content file, which is usually located next to the page's index.md file.  
**content/my-page/index.md** *defines the page and a few attributes such as page title*  
**content/my-page/my-fragment.md** *content file for a fragment specified as attribute `fragment = "content-single"`*

That file should contain at least the following:
```
+++
date = "1970-01-01"
fragment = "[The fragment you want to use]"
weight = 10
+++
```

For image bundling or data that is separate such as member and item (`items` fragment) files a subdirectory can be used.  
**content/my-page/index.md** *defines the page and a few attributes such as page title*  
**content/my-page/my-fragment.md** *content file for a fragment specified as attribute `fragment = "content-single"`*  
**content/my-page/my-fragment/my-teammate.md** *individual content file per member*  
**content/my-page/my-fragment/my-teammate.png**

The attributes and content of this file are passed to the specified fragment (`fragment = "content-single"`).
Using the `weight` attribute you can specify the place on the page the fragment is rendered.

### Image resource fallthrough

Some fragments (`hero` fragment for example) may display images, if configured in their content files. The configuration always accepts a filename and the fragment would look for a file with that name in the following order.

- If the content file controlling the fragment is located in it's own directory (`content/[page]/[fragment]/[filename].md`), fragment will look for a file with the name specified in that content in that directory.
- If the specified file is not found in that directory or the controlling content is in page directory, fragment will look in that page directory as well.
- If the file is not found in the page directory the fragment will look in images directory for that file.

So the fragment will look in the following order `fragment > page > images (global)`. If you need to use an image in several pages you can put it in the `static/images/` directory and the image would be available globally. But if an image may differ between two pages or even two fragments of same type, it's possible to have it using this mechanism.

Syna supports custom favicons in config.toml allowing for ICO, PNG or SVG image formats. In order to use one of the custom favicon formats, you can specify the image file name in config.toml and save the image file in the '/static' directory.

### Supported Colors

Fragments and various elements can be customized further using Bootstrap color classes.
These colors are customized within `config.toml` to fit the Syna theme.

| class     | colors  |
| --------- | ------- |
| primary   | #00838F |
| secondary | #868e96 |
| success   | #008f54 |
| info      | #00838F |
| warning   | #fdf314 |
| danger    | #dc1200 |
| light     | #f8f9fa |
| dark      | #343a40 |

Classes can be applied to style text, buttons and fragment backgrounds and links.
These colors can also be overwritten for more details see our [style documentation](#styles).

### Short-comings

As mentioned, fragments are controlled by content files. There is one exception and that is menus. Hugo does not allow menus to be defined in content files. In order to customize menu options for a fragment you need to configure them `config.toml` of your website. As of right now there are three fragments using menus:

- **nav**: `menu.prepend`, `menu.main` and `menu.postpend`
- **footer**: `menu.footer` and `menu.footer_social`
- **copyright**: `menu.copyright_footer`

> Whenever Hugo allows for resource menus or when we figure out a way to have menu features with frontmatter arrays this would change and menus would be configurable with resource variables like everything else. The change would be breaking. So when updating the theme please read the changelog and check for breaking changes.

Furthermore we use two keywords, that can't be used to create pages.
Both `ìndex` and `global` have a special meaning within the Syna fragment and using them separately might lead to issues.

## Front-end development and design

We develop our front-end code in the `assets/` directory which allows us to have a development directory that would be built to be production ready and put inside the `static/` and `resources/` directories (which are the directories Hugo looks into for front-end files) using [Webpack](https://webpack.js.org/) and Hugo's own resource pipelines.
To start the build process for development run the following commands:

```
make dep
make dev # Or make build for production build
```

> Prerequisites: node and yarn need to be installed on your system.

### Styles

Syna is using Bootstrap v4.1 with a customized set of colors.
You can change these colors by editing the them in `config.toml`.
To change other Bootstrap variables visit `assets/styles/bootstrap/_variables.scss` file.
We also use some extra styles to customize some parts of the theme which are available in the `assets/styles` directory.

### JavaScript

Syna uses code spliting to get bundles for each fragment.
This allows us to have lighter pages in most cases.
Within the `assets/js/` directory there is an `index.js` file that is the main script, which is necessary on all pages.
Every other script is needed by the fragment of the same name.
For example `hero.js` is needed by the `hero` fragment.

If you want to add an extra script for an specific fragment, you need to add that script as an entry point in the [webpack configuration file](/webpack.config.js).
Then import that script inside the fragment (using the `script` tag).

Transpiled and bundled JS files are located inside `assets/scripts/` directory and are generated using Webpack.

#### React support

Syna has built-in support for React. We use React portal API inside the `react-portal` fragment. This allows us to render an empty container that is able to render components inside it.  
To use this feature you can add a new `react-portal` to your page, write your component and expose it inside the `window.synaPortals` object.

```jsx
import * as React from 'react';

class Hello extends React.Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}

(window.synaPortals || (window.synaPortals = {})).hello = {
  component: Hello,
  container: '#hello [data-portal]',
};
```

The `#hello [data-portal]` is where your component renders. `[data-portal]` is a `div` tag inside your `react-portal` fragment and `hello` in this example, is the fragment's filename.

Keep in mind that JSX is not supported by browsers. Please checkout our [example Webpack config](https://github.com/okkur/syna/blob/master/exampleSite/webpack.config.js) and the required [dependencies and commands](https://github.com/okkur/syna/blob/master/exampleSite/package.json).

### Fragment implementation

Fragments themselves are [Hugo partials](https://gohugo.io/templates/partials/) that are located in `layouts/partials/fragments/`.
Partials built into Syna are stored within the theme's layout directory.
Hugo enables local or per website overwrites of layouts and partials.
For more details checkout [Hugo's template lookup order](https://gohugo.io/templates/lookup-order/)).

The default layout `single.html` is used to render each page. For list pages we use `list.html` layout.
**These layouts don't need to be explicitly mentioned**

The rendering code flow of Syna would do the following:

- `single.html` or `list.html` layout is called
  - The layout decides where the page directory is located (for list pages, it would be a `_index` directory next to `index.md`)
  - `helpers/fragments.html` would find all the global fragments and all the local fragments
    - The process of finding all the fragments involved destructing the path to the page
    - Locating all the `_global/` directories in the parent directories and the current directory if the current page is a list page
    - Sorting the said directories from the closest to the page to the furthest, making the local fragments and nearest `_global` directories more important
  - The helper would then remove duplicate fragments (fragments with the same name or the same directory name)
  - All the page fragments are registered in a Scratch and can later be used for various reasons
- `head.html` partial is rendered from `baseof.html` layout
- `helpers/fragments-renderer.html` is called
  - Fragments are ordered based on their `weight` attribute
  - Fragments that are not disabled are rendered (404 fragment would not be rendered in any other page than 404)
- A container for modal and React is added to the page in case there is any need for them
- `js.html` partial is rendered from `baseof.html` layout

![This is how fragments are rendered in the single layout](/docs/fragments-01.png)

### Creating new fragments

In order to create a new fragment for you website create a new layout file named after your fragment and place it under `[project_root]/layouts/partials/fragments/`.
Fragments are partials and follow the same rules. If you are not familiar with partials more details are available in the [Hugo documentation](https://gohugo.io/templates/partials/).

## Further reading

In order to deploy your website using Syna follow the [Hugo documentation](https://gohugo.io/hosting-and-deployment/) which describes the process of deploying on various hosts or host agnostic approaches.

```
If there is something that's not documented, create a new issue or contribute it.

See how you can contribute with our [contribution guide](/CONTRIBUTING.md).
```
