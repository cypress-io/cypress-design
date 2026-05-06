# DocMenu — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-docmenu          # Vue
yarn add @cypress-design/react-docmenu        # React
yarn add @cypress-design/constants-docmenu    # shared types (NavGroup, NavItemLink)
```

## Props

| Prop            | Type                          | Default  | Description                                    |
| --------------- | ----------------------------- | -------- | ---------------------------------------------- |
| `items`         | `(NavItemLink \| NavGroup)[]` | required | Navigation tree to render                      |
| `activePath`    | `string`                      | —        | URL path used to highlight the active item     |
| `collapsible`   | `boolean`                     | `true`   | Whether groups can be collapsed                |
| `linkComponent` | `Component \| "a"`            | `"a"`    | Override the link element (e.g. a router-link) |

### `NavItemLink` shape

```ts
interface NavItemLink {
  label: string
  href: string
  icon?: Component
}
```

### `NavGroup` shape

```ts
interface NavGroup {
  label: string
  items: (NavItemLink | NavGroup)[]
  href?: string
  collapsible?: boolean
}
```

## Events

_None_ — navigation is handled by the `linkComponent`.

## Slots

_None_ — the component is purely data-driven via `items`.
