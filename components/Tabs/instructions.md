# Tabs — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-tabs          # Vue
yarn add @cypress-design/react-tabs        # React
yarn add @cypress-design/constants-tabs    # shared types (Tab)
```

## Props

| Prop       | Type                                                                                                                          | Default     | Description                     |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `tabs`     | `Tab[]`                                                                                                                       | required    | Array of tab descriptor objects |
| `activeId` | `string`                                                                                                                      | —           | ID of the currently active tab  |
| `variant`  | `"default" \| "indigo-light" \| "dark-small" \| "dark-large" \| "underline-small" \| "underline-center" \| "underline-large"` | `"default"` | Tab strip visual style          |

### `Tab` shape

```ts
interface Tab {
  id: string
  label: string
  href?: string // makes tab a link (for a11y / SEO)
  icon?: Component // icon to the left of the label
  iconAfter?: Component // icon to the right of the label
  tag?: string // small badge text rendered after the label
  'aria-controls': string // id of the associated tab panel (required)
}
```

## Events

| Event             | Payload       | Description                                                                     |
| ----------------- | ------------- | ------------------------------------------------------------------------------- |
| `switch`          | `SwitchEvent` | Emitted before the active tab changes. Call `event.preventDefault()` to cancel. |
| `update:activeId` | `string`      | Emitted after a tab switch with the new active tab id                           |

### switch

```vue
<Tabs
  @switch="(tab: Tab, evt: SwitchEvent) => {
    // your code here
  }"
/>
```

### update:activeId

```vue
<Tabs
  @update:activeId="(id: string) => {
    // your code here
  }"
/>
```

## Slots

_None_ — tab content panels must be managed by the consuming component, linked via `aria-controls`.
