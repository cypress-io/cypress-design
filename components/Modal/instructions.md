# Modal — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-modal        # Vue
yarn add @cypress-design/react-modal      # React
```

## Props

| Prop                     | Type        | Default | Description                                                                                                                   |
| ------------------------ | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `show`                   | `boolean`   | `false` | Controls visibility. Vue: bind with `v-model:show`. React: controlled — set it to `false` from `onClose`                      |
| `title`                  | `string`    | —       | Title text in the header bar                                                                                                  |
| `helpLink`               | `string`    | —       | URL for a "Need help" link shown in the header. The label is fixed. Vue opens it in a new tab; React opens it in the same tab |
| `fullscreen`             | `boolean`   | `false` | Expands modal to near-fullscreen dimensions                                                                                   |
| `className` (React only) | `string`    | —       | Extra classes added to the `<dialog>` element                                                                                 |
| `closeIcon` (React only) | `ReactNode` | —       | Replaces the default ✕ icon inside the close button                                                                           |

The close button is always shown.

## Events

| Event               | Payload   | Description                                                                                                |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `update:show` (Vue) | `boolean` | Emitted whenever the open state changes, including when the modal closes itself (close button or backdrop) |
| `close` (Vue)       | —         | Emitted whenever the modal closes: close button, backdrop click, or `show` set to `false`                  |
| `onClose` (React)   | —         | Called when the close button or backdrop is clicked. The modal stays open until you set `show` to `false`  |

In Vue, clicking the close button or the backdrop closes the modal on its own. In React, nothing closes until `show` changes.

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

### update:show

```vue
<Modal
  @update:show="(value: boolean) => {
    // your code here
  }"
/>
```

### onClose

```tsx
<Modal show={visible} onClose={() => setVisible(false)} />
```

## Slots

| Slot      | Description                                        |
| --------- | -------------------------------------------------- |
| `default` | Main body content. In React, pass it as `children` |
