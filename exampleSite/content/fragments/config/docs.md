+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  sticky = true
+++

### Variables

#### config
*type: array of objects&*

##### config.type
*type: string*  
*accepted values: meta, css, js, icon*

Type of the configuration.

##### config.block
*type: boolean*  
*default: false*

This value determines whether css, js or icon configuration is added to the `<head>` tag or at the end of the `<body>` tag of the document. If a url or code is added to the `<head>` or before any part of the HTML, it would block the render and runtime of the rest of the document.

##### config.resource
*type: string*

Path to the resource. Can accept a file name (relative to static directory) or a url.

If `config.type` is set to any of `css`, `js` or `icon`, either `config.resource` or `config.html` should be provided.

##### config.html
*type: string*

HTML code injected directly to the page.

If `config.type` is set to any of `css`, `js` or `icon`, either `config.resource` or `config.html` should be provided.

[Global variables]{{< ref "global-variables">}}) are documented as well and have been omitted from this page.
