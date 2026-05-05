# SpecListTestItem — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-speclisttestitem      # Vue
yarn add @cypress-design/react-speclisttestitem    # React
```

## Props

| Prop        | Type                                                                      | Default  | Description                               |
| ----------- | ------------------------------------------------------------------------- | -------- | ----------------------------------------- |
| `filename`  | `string`                                                                  | required | The spec file name to display             |
| `directory` | `string`                                                                  | —        | Directory path shown before the filename  |
| `status`    | `"passed" \| "failed" \| "pending" \| "skipped" \| "running" \| "notRun"` | —        | Test status indicator                     |
| `active`    | `boolean`                                                                 | `false`  | Highlights the item as currently selected |
| `count`     | `number`                                                                  | —        | Number of tests shown as a badge          |

## Events

| Event   | Payload      | Description                      |
| ------- | ------------ | -------------------------------- |
| `click` | `MouseEvent` | Emitted when the item is clicked |

### click

```vue
<SpecListTestItem
  @click="(event: MouseEvent) => {
    // your code here
  }"
/>
```

## Slots

_None_ — the component is data-driven via props.
