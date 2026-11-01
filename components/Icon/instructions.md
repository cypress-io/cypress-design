---
name: components/Icon/instructions
description: 'Icon API — tree-shaken named icon exports: usage, shared props, events, and slots. Fetch when using, reviewing, or referencing Icon in a Vue or React project.'
---

# Icon — Props, Events & Slots

Install commands and live examples: [React ReadMe](https://design.cypress.io/agents/components/Icon/react/ReadMe.md) and [Vue ReadMe](https://design.cypress.io/agents/components/Icon/vue/ReadMe.md).

## Usage

Each icon is a standalone component exported by name: `Icon` + the PascalCase icon id (`action-play-small` → `IconActionPlaySmall`). Digits split off as their own word, so the letter after them is capitalized too (`testing-type-e2e` → `IconTestingTypeE2E`, `general-grid-2x2` → `IconGeneralGrid2X2`); let your editor autocomplete the import from the package to get the exact name. Browse ids on the [Icons page](https://design.cypress.io/icons); the generated list is `iconsMetadata` in `@cypress-design/icon-registry`.

```ts
// Vue
import {
  IconActionPlaySmall,
  IconStatusPassedSolid,
} from '@cypress-design/vue-icon'

// React
import {
  IconActionPlaySmall,
  IconStatusPassedSolid,
} from '@cypress-design/react-icon'
```

Use named imports. The default export `Icon` takes a `name` prop (`<Icon name="action-play-small" />`), but it imports the full icon set, so it defeats tree-shaking. React also exports it as the named `Icon`.

## Props

Props are typed per icon (`Nameless<IconName>Props` in `@cypress-design/icon-registry`), so TypeScript accepts only the sizes and color channels that icon ships with.

| Prop                                                        | Type         | Default                                        | Description                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------- | ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `size`                                                      | string union | `'16'` if the icon has it, else its first size | Picks one of the pre-drawn canvases the icon ships in (e.g. `'16' \| '24'`). It does not scale the drawing. A size the icon doesn't have throws: named exports throw `Icon "<name>" is not available in size <size>`; the default `Icon` throws `icon '<name>' at size <size> not found`. Resize with CSS instead. |
| `strokeColor`                                               | `WindiColor` | —                                              | Stroke color (e.g. `"indigo-500"`)                                                                                                                                                                                                                                                                                 |
| `fillColor`                                                 | `WindiColor` | —                                              | Fill color                                                                                                                                                                                                                                                                                                         |
| `secondaryStrokeColor`                                      | `WindiColor` | —                                              | Secondary stroke color (dual-tone icons only)                                                                                                                                                                                                                                                                      |
| `secondaryFillColor`                                        | `WindiColor` | —                                              | Secondary fill color (dual-tone icons only)                                                                                                                                                                                                                                                                        |
| `hover*` / `focus*` / `focusWithin*` / `hocus*` color props | `WindiColor` | —                                              | State variants of each color prop above (e.g. `hoverStrokeColor`). Kebab-case aliases are accepted too. Full list: `ICON_COLOR_PROP_NAMES` in `@cypress-design/icon-registry`.                                                                                                                                     |
| `interactiveColorsOnGroup`                                  | `boolean`    | `false`                                        | Apply the state color props on the parent's `group` hover/focus instead of the icon's own                                                                                                                                                                                                                          |
| `alt`                                                       | `string`     | —                                              | Rendered as the SVG's `<title>`                                                                                                                                                                                                                                                                                    |
| `className` (React) / `class` (Vue)                         | `string`     | —                                              | Extra CSS classes, merged with the generated color classes                                                                                                                                                                                                                                                         |

Which color channels each icon accepts is shown on the [Icons page](https://design.cypress.io/icons) (s = stroke, f = fill, f+ = secondaryFill, s+ = secondaryStroke).

Any other native SVG attribute (`aria-hidden`, `role`, `data-cy`, `style`, …) is passed through to the `<svg>`.

## Animated icons

`IconAnimated*` exports (e.g. `IconAnimatedObjectGear`) morph between two states with the `animated` prop: required `boolean` in React, optional (default `false`) in Vue. They render a 24×24 `viewBox`, and most set no `width` or `height`, so they stretch to fill their container — always pass `width="24" height="24"` or size them with CSS. They accept `strokeColor`, `fillColor`, their state variants, and `interactiveColorsOnGroup`. They have no `size` or `alt` prop.

## Events

_None_ — icons are presentational.

## Slots

_None._

## Accessibility

- Icons set no `role` or `aria-*` attribute; the consumer decides whether each icon is decorative or meaningful.
- Decorative icon (next to visible text, or inside a labeled control): pass `aria-hidden="true"`.
- Meaningful icon with no visible text: pass `alt` (rendered as `<title>`) and `role="img"`. Animated icons have no `alt`; use `role="img"` with `aria-label`.
- Icons have no focus or click handling. For interaction, wrap the icon in a `<button>` or `<a>` with an accessible name.
