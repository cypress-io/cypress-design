---
name: components/Menu/instructions
description: 'Menu API — menu list: props, events, and slots. Fetch when using, reviewing, or referencing Menu in a Vue or React project.'
---

# Menu — Props, Events & Slots

The item types (`NavMenuItem`, `NavMenuGroup`, `DataAttributes`) come from `@cypress-design/constants-menu`. Neither framework package lists it as a runtime dependency, but their published type declarations import it — install it alongside `react-menu` / `vue-menu`. The same applies to `@cypress-design/react-icon` / `@cypress-design/vue-icon` if you pass icons. Both packages export only the default `Menu` component; the item-with-icon types used by its `items` prop aren't exported.

## Props

| Prop         | Type                              | Default                    | Description                                                                        |
| ------------ | --------------------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| `items`      | `(NavMenuGroup \| NavMenuItem)[]` | React: required. Vue: `[]` | Items to render. Omitting it in React throws.                                      |
| `activePath` | `string`                          | —                          | An item (or group) is active when `item.href === activePath` — exact string match. |
| `className`  | `string`                          | — (React only)             | Added to the top-level `<ul>`. React also spreads other `<ul>` props onto it.      |

## Item shape

`NavMenuItem` and `NavMenuGroup<T>` are defined in `components/Menu/constants/src/index.ts`. `NavMenuGroup` extends `NavMenuItem` and adds `items` and `submenuClassName`, so a group label can also take an `href` and be active. Each framework's `Menu` adds `icon`, `iconActive`, and `anchorAttributes` on top (see `react/Menu.tsx`, `vue/Menu.vue`).

`className` goes on the item's `<li>` in both frameworks. Fields that behave differently by framework:

| Field                               | React                                                                      | Vue                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `submenuClassName`                  | On the group's nested `<ul>`                                               | On the `<ul>` wrapping the group itself, not its children                                |
| `anchorClassName`, `labelClassName` | Applied to the `<a>` / label `<span>`                                      | Not applied — not declared as props, so they fall through as raw attributes on the `<a>` |
| `anchorAttributes`                  | Spread onto the `<a>` (`AnchorHTMLAttributes \| DataAttributes`)           | Not applied — falls through as a raw attribute on the `<a>`                              |
| `interactiveColorsOnGroup`          | `true` adds `group` to the `<a>` so the icon's hover colors follow the row | Not applied; the `<a>` always has `group`                                                |

Icons: Menu renders `icon` at 24px and `iconActive` (an animated icon) in its place when the item is active. In React, pass any icon component that ships at 24px directly (`icon: IconObjectGear`), including icons that also ship at 16px. An item with an `icon` but no `iconActive` gets the indented sub-item styling (left border, extra margin), same as an item with no icon — set both for a top-level row.

Vue only: `Menu` renders one `<ul>` per item (the `v-for` is on its root), so attributes like `class` set on `<Menu>` aren't applied to any element. Wrap it in your own element to size or position it.

## Events

| Event       | Payload      | Description                                                                                               |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `mousedown` | `MouseEvent` | Vue only — emitted on mousedown anywhere in the menu. See `components/Menu/vue/ReadMe.md` for an example. |

In React, pass `onMouseDown` (or any other `<ul>` handler); it's spread onto the top-level `<ul>`.

## Slots

_None_ — the component is data-driven via `items`.

## Accessibility

- Menu renders `<ul>`/`<li>`/`<a>` only. It doesn't add a `<nav>` landmark — wrap it in `<nav aria-label="…">`.
- The active item gets only visual styling; no `aria-current` is set, so screen readers don't announce it.
- Items are plain links, so keyboard users Tab between them; there is no arrow-key navigation or menu role.
- Icons are decorative and carry no accessible name — always give each item a `label`.
