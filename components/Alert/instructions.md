# Alert — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-alert        # Vue
yarn add @cypress-design/react-alert      # React
yarn add @cypress-design/constants-alert  # shared types
```

## Props

| Prop                  | Type                                                                  | Default  | Description                           |
| --------------------- | --------------------------------------------------------------------- | -------- | ------------------------------------- |
| `variant`             | `"info" \| "success" \| "error" \| "warning" \| "neutral" \| "clear"` | `"info"` | Sets color scheme and icon            |
| `size`                | `"xs" \| "sm" \| "md" \| "lg"`                                        | `"lg"`   | Controls padding and font size        |
| `title`               | `string`                                                              | —        | Bold header text                      |
| `icon`                | component                                                             | —        | Icon rendered before the title        |
| `collapsible`         | `boolean`                                                             | `false`  | Allows body to be toggled open/closed |
| `modelValue` / `open` | `boolean`                                                             | `true`   | Controls open state (v-model)         |
| `dismissible`         | `boolean`                                                             | `false`  | Shows a close button                  |

## Events

| Event               | Payload   | Description                              |
| ------------------- | --------- | ---------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when open state changes          |
| `dismiss`           | —         | Emitted when the close button is clicked |

## Slots

| Slot      | Description                           |
| --------- | ------------------------------------- |
| `default` | Main body content of the alert        |
| `title`   | Custom title (overrides `title` prop) |
| `icon`    | Custom icon (overrides `icon` prop)   |
