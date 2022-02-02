+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  sticky = true
+++

### Note

Use one instance of this fragment per page. Running more might lead to unexpected issues.

### Menus

- .Site.Menus.main

  **Note:** Menus displayed in the nav fragment can be nested, in which case the nested menus are displayed in a dropdown. Please see "[nesting](https://gohugo.io/content-management/menus/#nesting)" section of Menus documentation in Hugo documentation.

  ```
  # config.toml

  [[menu.main]]
    url = "/about"
    name = "About"
    weight = 10
    identifier = "about"

  [[menu.main]]
    url = "/about/team"
    name = "Our team"
    weight = 10
    parent = "about"

  [[menu.main]]
    url = "/about/office"
    name = "Our office"
    weight = 20
    parent = "about"
  ```

### Variables

#### search
*type: boolean*  
*default: false*

If set to `true`, search is enabled within the navbar.  
**Note:** The additional input field used for search will alter the menu layout.

#### sticky
*type: boolean*  
*default: false*

If set to `true`, navbar will stick to the top of the screen whenever page scrolls past it.

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
*default: true*

##### breadcrumb.level
*type: number*  
*default: 1*

Define the section level the breadcrumb will start being shown.
 
The default value `1` would lead to the following being defined: 

```
content/_index # level 0, not shown
content/blog/_index # level 1, shown
content/blog/article-1 # level 2, shown
```

##### breadcrumb.background
*type:  string*  
*recommended: primary, secondary, white, light, dark*  
*accepted values: primary, secondary, white, light, dark, warning, success, danger, info, transparent*

#### asset
*type: [asset object]({{< ref "global-variables" >}}#asset)*

Asset will be shown as a clickable logo directing to the main page.

#### repo_button
*type: object*

Enable a button on the top right navbar. Usually used to link to your repository such as Github or Gitlab.  
The icon can be customized via `repo_button.icon`.

##### repo_button.url
*type: string*

##### repo_button.text
*type: string*  
*default: star*

##### repo_button.icon
*type: string*  
*default: fab fa-github*

##### repo_button.no_text
*type: boolean*  
*default: false*

#### buttons
*type: array of object*

This enables the addition of one or more buttons on the top right navbar, just like `repo_button`. It can be used in conjunction with `repo_button` or replace it entirely if required.

The following configuration mimics the behavior of `repo_button`:

```
[[buttons]] 
  url = "https://github.com/okkur/syna"
  text = "Star"
```

##### buttons.url
*type: string*  
*required*

##### buttons.title
*type: string*  
*default: GitHub*

Defines the title of the button. The title is used to define de default values for `buttons.text` and `buttons.icon`.

It uses the same base names of **Font Awesome** to display icons but in a case insensitive manner. For example, `GitHub` sets the default `buttons.text` to `GitHub` and the default `buttons.icon` to `fab fa-github`. If you set the title name to `fAcEbOoK`, the default `buttons.text` will be `fAcEbOoK` and the default `buttons.icon` will be `fab fa-facebook`.

##### buttons.text
*type: string*  
*default: The name of the profile* 

Sets the text to be displayed on the right of the icon in the button. If not set, it will try to use the default value. If set to "", the text will be removed and the icon centered within the button.

##### buttons.text
*type: string*  
*default: The profile's default*

Sets the icon to be displayed on the left or center of the button. If unset or setted to "", the icon used will be the default icon defined by the profile.

Its actual value must be one of the styles defined by **Font Awesome**. For example `fab fa-accessible-icon` for `accessible-icon`, `fas fa-star` for `star`, etc.

[Global variables]({{< ref "global-variables" >}}) are documented as well and have been omitted from this page.
