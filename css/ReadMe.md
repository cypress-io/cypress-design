# @cypress-design/css

We style every component using a utility first CSS framework: TailwindCSS.
Install it in your project to render the components properly.

To do that, follow the two steps below:

## Install the CSS package in your dev dependencies:

```bash
yarn add -D @cypress-design/css
```

## Using cyColors in stylesheets

When building this package, we also have a script `generate-colors-css.ts` to generate the file `colors.css` which recreates all the `cyColors` from `color-constants.ts` as css variables. If a color needs to be added or updated, only the object `cyColors` in `color-constants.ts` needs to be updated. Then, we need to rebuild the package so that `colors.css` can be regenerated so you should run:

```base
cd css && yarn build
```

### To use those css variables:

In your `.css` files add:

```
@import "@cypress-design/css/index.css";
```

In your `.scss` files add:

```
@use "@cypress-design/css/index.css" as *
```

and then you can use the variables from `colors.css` like this:

```
border: 1px solid var(--cy-gray-800);
```

## Remove Windi (if installed)

If windicss is installed, uninstall it first:

- remove the custom imports for windi `import 'virtual:windi.css'`
- remove the plugin from webpack or from vite config

## Install Tailwind

Install tailwind: Follow [the tailwind docs](https://tailwindcss.com/docs/installation/using-postcss)

Finally update your tailwind config file.

### The simplest way

This config is less verbose but only allows you to customize the files scanned.

```js
// tailwind.config.cjs
const { TailwindConfig } = require('@cypress-design/css')

module.exports = TailwindConfig([
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
])
```

### The explicit way

If you plan on configuring

```js
// tailwind.config.cjs
const cypressCSS = require('@cypress-design/css')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [cypressCSS.TailwindConfig()],
  content: {
    files: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    extract: ['vue', 'js', 'tsx'].reduce((acc, ext) => {
      acc[ext] = cypressCSS.TailwindIconExtractor
      return acc
    }, {}),
  },
}
```

## Install WindiCSS (deprecated)

### Webpack

```js
const { CyCSSWebpackPlugin } = require('@cypress-design/css')

module.exports = {
  plugins: [
    CyCSSWebpackPlugin({
      scan: {
        include: ['src/**/*.@(tsx|ts|js|vue)'],
      },
    }),
  ],
}
```

### Vite

```js
import { defineConfig } from 'vite'
import { CyCSSVitePlugin } from '@cypress-design/css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    CyCSSVitePlugin({
      scan: {
        include: ['/src/**/*.@(tsx|ts|js|vue)'],
      },
    }),
  ],
})
```

> **NOTE**: Add your html page and all your react and vue component files to the `scan.include` array.
> This helps WindiCSS determine which class to include in the final generated CSS.
