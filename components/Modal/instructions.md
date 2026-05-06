# Modal — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-modal        # Vue
yarn add @cypress-design/react-modal      # React
```

## Props

| Prop                  | Type      | Default        | Description                                 |
| --------------------- | --------- | -------------- | ------------------------------------------- |
| `modelValue` / `open` | `boolean` | `false`        | Controls visibility (v-model)               |
| `title`               | `string`  | —              | Title text in the header bar                |
| `helpLink`            | `string`  | —              | URL for a help link shown in the header     |
| `helpLinkText`        | `string`  | `"Learn more"` | Label for the help link                     |
| `fullscreen`          | `boolean` | `false`        | Expands modal to near-fullscreen dimensions |
| `dismissible`         | `boolean` | `true`         | Shows the ✕ close button                    |

## Events

| Event               | Payload   | Description                                                        |
| ------------------- | --------- | ------------------------------------------------------------------ |
| `update:modelValue` | `boolean` | Emitted when open state changes                                    |
| `close`             | —         | Emitted when the modal requests closing (close button or backdrop) |

### close

```vue
<Modal
  @close="
    () => {
      // your code here
    }
  "
/>
```

### update:modelValue

```vue
<Modal
  @update:modelValue="(value: boolean) => {
    // your code here
  }"
/>
```

## Slots

| Slot      | Description                           |
| --------- | ------------------------------------- |
| `default` | Main body content                     |
| `title`   | Custom title (overrides `title` prop) |
| `footer`  | Footer area, typically action buttons |
