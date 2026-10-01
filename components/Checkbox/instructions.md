# Checkbox — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-checkbox        # Vue
yarn add @cypress-design/react-checkbox      # React
```

## Props

| Prop                    | Type                                 | Default             | Description                                                                                                                                                                                                    |
| ----------------------- | ------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelValue` (Vue only) | `boolean \| string[]`                | —                   | Checked state (v-model). With an array, the box is checked when the array contains `name`, and toggling adds or removes `name`. Read on first render only — later changes from the parent don't update the box |
| `checked`               | `boolean`                            | `false`             | Checked state on first render. Later changes are ignored. In Vue, the box starts checked if either `checked` or `modelValue` is truthy                                                                         |
| `label`                 | `string` (Vue) / `ReactNode` (React) | —                   | Label rendered next to the checkbox. Set it (or the Vue `label` slot) so the checkbox is accessible                                                                                                            |
| `id`                    | `string`                             | generated unique id | Links the label to the input                                                                                                                                                                                   |
| `name`                  | `string`                             | value of `id`       | Name attribute of the input. Required when `modelValue` is an array                                                                                                                                            |
| `color`                 | `"indigo" \| "jade" \| "red"`        | `"indigo"`          | Checked fill color                                                                                                                                                                                             |
| `disabled`              | `boolean`                            | `false`             | Disables interaction                                                                                                                                                                                           |
| `inputTabIndex`         | `number`                             | —                   | Forwarded to the input's `tabindex`. Use `-1` when the checkbox sits inside a wider interactive row, such as a Select checkbox row                                                                             |
| `hideInput`             | `boolean`                            | `false`             | Removes the input from the layout and the accessibility tree (`display: none`). Use inside a wider interactive row that acts as the option                                                                     |

In React, `className` and other HTML attributes are forwarded to the wrapper `<span>`.

## Events

| Event                     | Payload                               | Description                                                                                            |
| ------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `update:modelValue` (Vue) | `boolean \| string[]`                 | Emitted when the checked state changes. The payload is the updated array when `modelValue` is an array |
| `change` (Vue)            | `boolean`                             | Emitted with the new checked state (not a native `Event`)                                              |
| `onChange` (React)        | `React.ChangeEvent<HTMLInputElement>` | Required. Called with the native change event from the underlying input                                |

In Vue, when `modelValue` is an array and `name` is not set, neither event is emitted.

### update:modelValue

```vue
<Checkbox
  @update:modelValue="(value: boolean | string[]) => {
    // your code here
  }"
/>
```

### change

```vue
<Checkbox
  @change="(value: boolean) => {
    // your code here
  }"
/>
```

## Slots

| Slot    | Description                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------- |
| `label` | Custom label content (overrides `label` prop). Vue only — in React, pass a `ReactNode` to `label` |
