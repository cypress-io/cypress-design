# Cypress Design System

## Usage

### See the docs

The storybooks on this repo are published after any commit to the main branch to

https://cypress-design.vercel.app

### Install windicss

First install the css package

```bash
npm install -g @cypress-design/css
```

Then, add the plugins to your bundler

```js
// webpack.config.js
import { CyCSSWebpackPlugin } from '@cypress-design/css';

export default (config) => ({
  // the rest of the webpack config...
  plugins: [
    //...
    CyCSSWebpackPlugin(),
  ],
});
```

See [the css package ReadMe](./css/) for more options

### Install each component independently

To make sure each component fix is never blocked by an ongoing refactoring, we decided to publish each component as its own package.

If you want to install the Cypress Button, run

```bash
npm install @cypress-design/vue-button
```

At Cypress, we prefer using Vuejs to build new apps.

Since some projects at Cypress already use React as a framework, we decided to still publish each component as a react version and a vue version.

If you want to install the Cypress Button, and your project still uses React, install the react version

```bash
npm install @cypress-design/react-button
```

See [the component ReadMe](./components/) for the list of available components and [the docs](https://cypress-design.vercel.app) for their usage

## Contributing

### Running storybook

### Running tests

## Structure

- [components](./components/) A collection of components for building Cypress applications and websites.
- [css](./css/) What you need to install a pre-configured version of WindiCSS in a Cypress project.
- [storybook-vue](./storybook-vue/) The configuration of a storybook to showcase and work on the vue components.
- [storybook-react](./storybook-react/) The same as above but for React components.
