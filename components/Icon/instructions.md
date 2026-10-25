# Icon — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-icon        # Vue (tree-shaken named exports)
yarn add @cypress-design/react-icon      # React (tree-shaken named exports)
```

Each icon is a standalone component exported by name, e.g. `IconActionPlay`, `IconStatusPassed`.

## Usage

```ts
// Vue
import { IconActionPlay } from '@cypress-design/vue-icon'

// React
import { IconActionPlay } from '@cypress-design/react-icon'
```

## Shared Props (all icons)

| Prop                   | Type               | Default       | Description                                  |
| ---------------------- | ------------------ | ------------- | -------------------------------------------- |
| `strokeColor`          | `WindiColor`       | —             | Primary stroke color (e.g. `"indigo-500"`)   |
| `fillColor`            | `WindiColor`       | —             | Primary fill color                           |
| `secondaryStrokeColor` | `WindiColor`       | —             | Secondary stroke color (for dual-tone icons) |
| `secondaryFillColor`   | `WindiColor`       | —             | Secondary fill color (for dual-tone icons)   |
| `size`                 | `string \| number` | icon-specific | Override rendered size in px                 |
| `class` / `className`  | `string`           | —             | Extra CSS classes                            |

Available color channels per icon are shown on the [Icons page](/icons) (s = stroke, f = fill, f+ = secondaryFill, s+ = secondaryStroke).

## Events

_None_ — icons are presentational.

## Slots

_None._
