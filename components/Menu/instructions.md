---
name: components/Menu/instructions
description: 'Menu API — menu list: props, events, and slots. Fetch when using, reviewing, or referencing Menu in a Vue or React project.'
---

# Menu — Props, Events & Slots

Both packages export only the default `Menu` component. The item types its `items` prop uses (`NavMenuItem`, `NavMenuGroup`, `DataAttributes`) live in `@cypress-design/constants-menu`, a private package that isn't published to npm, so you can't import them — write item objects inline or declare a local type matching the shape below. Install `@cypress-design/react-icon` / `@cypress-design/vue-icon` only if you pass icons, to import the icons themselves.

## Props

| Prop         | Type                | Default                    | Description                                                                        |
| ------------ | ------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| `items`      | `(item \| group)[]` | React: required. Vue: `[]` | Items to render. Omitting it in React throws.                                      |
| `activePath` | `string`            | —                          | An item (or group) is active when `item.href === activePath` — exact string match. |
| `className`  | `string`            | — (React only)             | Added to the top-level `<ul>`. React also spreads other `<ul>` props onto it.      |

## Item shape

Each entry in `items` is an item or a group:

| Field                      | Type                | Description                                                              |
| -------------------------- | ------------------- | ------------------------------------------------------------------------ |
| `label`                    | `string`            | Required. The link text.                                                 |
| `href`                     | `string`            | Link target, and what `activePath` is compared against.                  |
| `key`                      | `string`            | List key. Falls back to `label`, so set it when two items share a label. |
| `className`                | `string`            | Classes for the item's `<li>` (Vue differs; see below).                  |
| `anchorClassName`          | `string`            | Classes for the item's `<a>`.                                            |
| `labelClassName`           | `string`            | Classes for the label `<span>`.                                          |
| `interactiveColorsOnGroup` | `boolean`           | Makes the icon's hover colors follow the whole row.                      |
| `icon`                     | component           | Icon rendered at 24px before the label.                                  |
| `iconActive`               | component           | Animated icon shown in place of `icon` while the item is active.         |
| `anchorAttributes`         | object              | Extra attributes for the `<a>`, including `data-*` attributes.           |
| `items`                    | `(item \| group)[]` | Groups only. Child items, rendered in a nested list.                     |
| `submenuClassName`         | `string`            | Groups only. Classes for the nested `<ul>`.                              |

A group is an item with `items`, so a group label can also take an `href` and be active.

Fields that behave differently by framework:

| Field                               | React                                                                      | Vue                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `className`                         | On the item's `<li>`                                                       | On the `<li>`, and also replaces the `<a>`'s own classes — don't use it in Vue           |
| `submenuClassName`                  | On the group's nested `<ul>`                                               | On the `<ul>` wrapping the group itself, not its children                                |
| `anchorClassName`, `labelClassName` | Applied to the `<a>` / label `<span>`                                      | Not applied — not declared as props, so they fall through as raw attributes on the `<a>` |
| `anchorAttributes`                  | Spread onto the `<a>` (`AnchorHTMLAttributes \| DataAttributes`)           | Not applied — falls through as a raw attribute on the `<a>`                              |
| `interactiveColorsOnGroup`          | `true` adds `group` to the `<a>` so the icon's hover colors follow the row | Not applied; the `<a>` always has `group`                                                |

Icons: Menu renders `icon` at 24px and `iconActive` (an animated icon) in its place when the item is active. In React, pass any icon component that ships at 24px directly (`icon: IconObjectGear`), including icons that also ship at 16px. An item with an `icon` but no `iconActive` gets the indented sub-item styling (left border, extra margin), same as an item with no icon — set both for a top-level row.

Vue only: `Menu` renders one `<ul>` per item (the `v-for` is on its root), so attributes like `class` set on `<Menu>` aren't applied to any element. Wrap it in your own element to size or position it.

## Events

| Event       | Payload      | Description                                                                                                                                                |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mousedown` | `MouseEvent` | Vue only — emitted on mousedown anywhere in the menu. See the [Vue ReadMe](https://design.cypress.io/agents/components/Menu/vue/ReadMe.md) for an example. |

In React, pass `onMouseDown` (or any other `<ul>` handler); it's spread onto the top-level `<ul>`.

## Slots

_None_ — the component is data-driven via `items`.

## Accessibility

- Menu renders `<ul>`/`<li>`/`<a>` only. It doesn't add a `<nav>` landmark — wrap it in `<nav aria-label="…">`.
- The active item gets only visual styling; no `aria-current` is set, so screen readers don't announce it.
- Items are plain links, so keyboard users Tab between them; there is no arrow-key navigation or menu role. Only items with an `href` are reachable: a group label without one renders an `<a>` with no `href`, which isn't focusable.
- Icons are decorative and carry no accessible name — always give each item a `label`.
