+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

This fragment doesn't make use of any variables except for global variables.

To register a React component in the portal, you need to add your component and name of the fragment's controller file to `window.synaPortals` object.

```
window.synaPortals['UNIQUE_IDENTIFIER] = {
  component: YOUR_COMPONENT,
  container: '#FRAGMENT_FILENAME [data-portal]',
};
```

*Replace capitalized phrases in the code above with what you need.*

The script above needs to be registered in the page where you have the React portal fragment. You can make use of Config fragment to either directly add the code in a `script` tag or load your JS file (recommended). You can also register your JS file as a custom JS file which would load the file in every page which is not recommended unless you're developing a single page application.

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
