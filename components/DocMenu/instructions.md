# DocMenu — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-docmenu          # Vue
yarn add @cypress-design/react-docmenu        # React
yarn add @cypress-design/constants-docmenu    # shared types (NavGroup, NavItemLink)
```

## Props

| Prop                                            | Type                                           | Default  | Description                                                                                                                                                        |
| ----------------------------------------------- | ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `items`                                         | `(NavItemLink \| NavGroup)[]`                  | required | Navigation tree to render                                                                                                                                          |
| `activePath`                                    | `string`                                       | —        | URL path used to highlight the active item (the one whose `href` matches)                                                                                          |
| `collapsible`                                   | `boolean`                                      | `true`   | Whether groups can be collapsed. When `false`, every group stays open and shows no chevron                                                                         |
| `linkComponent` (Vue) / `LinkComponent` (React) | a Vue component or `"a"` / `React.ElementType` | `"a"`    | Override the link element (e.g. a router link). It receives each item's fields except `label`, plus `class`/`className` and `style`, with the label as its content |

When `activePath` isn't set, Vue leaves it `undefined` and React uses `'<unknown>'`. In React no item matches. In Vue, group headers without an `href` compare equal to `undefined` and render in the active color.

React also passes any other `ul` attributes through to the top-level list.

### `NavItemLink` shape

```ts
interface NavItemLink {
  label: string
  href: string
}
```

### `NavGroup` shape

```ts
interface NavGroup {
  label: string
  items: (NavItemLink | NavGroup)[]
  href?: string
  collapsed?: boolean
}
```

- `collapsed` — when `true`, the group starts closed. A group that contains the active item opens when `activePath` changes. In React it also opens on first render and can't be closed while it holds the active item.
- `href` — the group header renders as a link to it when the menu's `collapsible` is `false`. The header is highlighted when `href` matches `activePath`.

## Events

_None_ — navigation is handled by the link component.

## Slots

_None_ — the component is purely data-driven via `items`.
