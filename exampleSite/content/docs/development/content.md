+++
fragment = "content"
weight = 100

title = "Development"

[sidebar]
  enable = true
+++

We develop our front-end code in the `assets/` directory which allows us to have a development directory that would be built to be production ready and put inside the `static/` and `resources/` directories (which are the directories Hugo looks into for front-end files) using [Webpack](https://webpack.js.org/) and Hugo's own resource pipelines.
To start the build process for development run the following commands:

```
make dep
make dev # Or make build for production build
```

> Prerequisites: node and yarn need to be installed on your system.

### Styles

Syna is using Bootstrap v4.1 with a customized set of colors.
You can change these colors by editing them in `config.toml`.
Change other Bootstrap variables using `assets/styles/bootstrap/_variables.scss`.
Syna customizes some parts of the theme via custom css, which is available in the `assets/styles` directory.

### JavaScript

Syna uses code spliting to get bundles for each fragment.
This allows us to have lighter pages in most cases.
Within the `assets/js/` directory there is an `index.js` file that is the main script, which is necessary on all pages.
Every other script is needed by the fragment of the same name.
For example `hero.js` is needed by the `hero` fragment.

If you want to add an extra script for a specific fragment, you need to add that script as an entry point in the [webpack configuration file](/webpack.config.js).
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
