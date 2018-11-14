+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

### Menus

- .Site.Menus.main

### Variables

#### search
*type: boolean*  
*default: false*

If set to `true`, a text input would be added to the navbar and changes the layout of menus. The input is used for search.

#### prepend, postpend
*type: array of objects*

Menu like objects that are used to add menus before and after the main menu.

##### prepend/postpend.url
*type: string*

##### prepend/postpend.name
*type: string*

#### breadcrumb
*type: object*

If object is set, breadcrumbs will be shown under the navbar.

##### breadcrumb.display
*type: boolean*
*default: in case object is defined the value is true, if not, it's false*

##### breadcrumb.level
*type: number*
*default: 1*

Specifies from which level of nested directories the breadcrumb should be shown. For example for the value of 1:

```
content/_index # level 0, not shown
content/blog/_index # level 1, shown
content/blog/article-1 # level 2, shown
```

##### breadcrumb.background
*type: primary, secondary, light, dark, warning, success (other Bootstrap background colors are acceptable as well)*  
*default: light*

#### asset
*type: asset object*

Asset will be shown as logo.

#### repo_button
*type: object*

If set, a repo button would be added to the navbar much like the Github button on top of this page.

##### repo_button.url
*type: string*

##### repo_button.text
*type: string*  
*default: star*

##### repo_button.icon
*type: string*  
*default: fab fa-github*

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
