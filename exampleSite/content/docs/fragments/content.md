+++
fragment = "content"
weight = 100

title = "Fragments"

[sidebar]
  enable = true
+++

### Syna & Fragments

Fragments are the base building block of your website.
Each page is made up of one or multiple fragments. 
These can be a navigation fragment, a content fragment or more.

#### Custom fragments
Multiple pre-bundled fragments are available.
You can add your own custom fragment by creating a new layout file within your websites's `layouts/partials/fragments/` directory.
If this path doesn't exist yet, you can create it beforehand.

#### Global Fragments

For fragments of a website, that need to show up on every page, we have global fragments.
Global fragments are located in a special content directory `content/_global/`.
All fragments within this directory are rendered on all pages by default.
*To not render the whole page as a subpath of your website the index.md file defines the whole directory as a `headless` bundle*.
To overwrite a global fragment create a per page fragment with the same filename.
This would overwrite the global one.

Aside from the `content/_global/` directory, you can create `_global/` directory in any section's directory (`content/[section]/_global/`).
Each section can have global fragments and if there are multiple fragments with the same name, the fragment closest to the page would override the others.

#### How to control fragments

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

#### Where to put the fragments

In Hugo, the simplest way to create a page is to create a directory containing an `index.md` file.
If you need to create a new section for your website, then instead of an `index.md` file, simply create `_index.md`.
Section pages in Hugo are mostly called `list` and other pages are called `single`.
For single pages, the directory content would look something like the following:

```
content
├── my-page
|   ├── index.md
|   ├── nav.md
|   ├── hero
|   |   ├── index.md
```

- `content` directory: The directory where Hugo looks for pages of the website
    - `my-page` directory: A page called `my-page` which is accessible by `[path-to-website]/my-page`
        - `index.md`: Contains page title, url and other page properties. Can also be a fragment itself.
        - `nav.md`: A nav fragment. Would override any other global fragment named `nav`.
        - `hero` directory: A directory that can contain a single fragment. Name of the fragment would be `hero` and would override any other fragment named hero.
            - `index.md`: Controller file for the hero fragment

For list pages, it's just a bit different:

```
content
|   ├── my-section
|   |   ├── _index.md
|   |   ├── _index
|   |   |   ├── index.md
|   |   ├── my-page
|   |   |   ├── index.md
```

- `_index.md`: This file is the same as `my-page/index.md` in the single layout but it **cannot** be a fragment
- `_index` directory: For list pages, fragments are located in this directory
    - `index.md`: This file should be a headless page. If not, Hugo would render the page. You can use this file as fragment.

#### Images in fragments

For image bundling or data that is separate such as member and item (`items` fragment) files a subdirectory can be used.  

- **content/my-page/index.md** *defines the page and a few attributes such as page title*  
- **content/my-page/my-fragment.md** *content file for a fragment specified as attribute `fragment = "content-single"`*  
- **content/my-page/my-fragment/my-teammate.md** *individual content file per member*  
- **content/my-page/my-fragment/my-teammate.png**

The attributes and content of this file are passed to the specified fragment (`fragment = "content-single"`).
Using the `weight` attribute you can specify the place on the page the fragment is rendered.

### Short-comings

As mentioned, fragments are controlled by content files. There is one exception and that is menus. Hugo does not allow menus to be defined in content files. In order to customize menu options for a fragment you need to configure them `config.toml` of your website. As of right now there are three fragments using menus:

- **nav**: `menu.prepend`, `menu.main` and `menu.postpend`
- **footer**: `menu.footer` and `menu.footer_social`
- **copyright**: `menu.copyright_footer`

> Whenever Hugo allows for resource menus or when we figure out a way to have menu features with frontmatter arrays this would change and menus would be configurable with resource variables like everything else. The change would be breaking. So when updating the theme please read the changelog and check for breaking changes.

Furthermore we use two keywords, that can't be used to create pages.
Both `ìndex` and `global` have a special meaning within the Syna fragment and using them separately might lead to issues.
