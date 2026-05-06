# Menu — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-menu          # Vue
yarn add @cypress-design/react-menu        # React
yarn add @cypress-design/constants-menu    # shared types
```

## Props

| Prop         | Type                              | Default | Description                                |
| ------------ | --------------------------------- | ------- | ------------------------------------------ |
| `items`      | `(NavMenuGroup \| NavMenuItem)[]` | `[]`    | Navigation items to render                 |
| `activePath` | `string`                          | —       | URL path used to highlight the active item |

### `NavMenuItem` shape

```ts
interface NavMenuItem {
  label: string
  href?: string
  key?: string
  className?: string
  anchorAttributes?: Partial<HTMLAnchorElement>
}
```

### `NavMenuGroup` shape

```ts
interface NavMenuGroup {
  label: string
  items: (NavMenuGroup | NavMenuItem)[]
  key?: string
  className?: string
  submenuClassName?: string
}
```

## Events

| Event       | Payload      | Description                     |
| ----------- | ------------ | ------------------------------- |
| `mousedown` | `MouseEvent` | Bubbled from any item mousedown |

### mousedown

```vue
<Menu
  @mousedown="(e: MouseEvent) => {
    // your code here
  }"
/>
```

## Slots

_None_ — the component is data-driven via `items`.
