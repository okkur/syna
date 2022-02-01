+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  sticky = true
+++

### Variables

#### buttons
*type: array of objects*

You can add as many buttons as you want.

##### buttons.text
*type: string*  
*required*

Title of the call to action button.

##### buttons.url
*type: string*  
*default: "#"*

URL of the call to action button.

##### buttons.color
*type: string*  
*accepted values: (outline-)primary, secondary, success, danger, warning, info, light, dark*  
*default: "primary"*

Color class of the button, based on Bootstrap classes. 

##### buttons.icon
*type: string*  
*accepted values: stylesheet classes such as "fas fa-check", "fab fa-linkedin", etc*  
*default: Defaults to "fas fa-check" if and only if the parameter is present and the value is ""*

Icons to be displayed if it is defined. Must be an icon style using **Font Awsome** icons.


[Global variables]({{< ref "global-variables" >}}) are documented as well and have been omitted from this page.
