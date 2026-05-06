# Checkbox — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-checkbox        # Vue
yarn add @cypress-design/react-checkbox      # React
```

## Props

| Prop                     | Type                          | Default    | Description                              |
| ------------------------ | ----------------------------- | ---------- | ---------------------------------------- |
| `modelValue` / `checked` | `boolean`                     | `false`    | Checked state (v-model)                  |
| `label`                  | `string`                      | —          | Text label rendered next to the checkbox |
| `color`                  | `"indigo" \| "jade" \| "red"` | `"indigo"` | Checked fill color                       |
| `disabled`               | `boolean`                     | `false`    | Disables interaction                     |
| `indeterminate`          | `boolean`                     | `false`    | Shows the indeterminate (dash) state     |

## Events

| Event               | Payload   | Description                                   |
| ------------------- | --------- | --------------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the checked state changes        |
| `change`            | `Event`   | Native change event from the underlying input |

### update:modelValue

```vue
<Checkbox
  @update:modelValue="(value: boolean) => {
    // your code here
  }"
/>
```

### change

```vue
<Checkbox
  @change="(event: Event) => {
    // your code here
  }"
/>
```

## Slots

| Slot      | Description                                   |
| --------- | --------------------------------------------- |
| `default` | Custom label content (overrides `label` prop) |
