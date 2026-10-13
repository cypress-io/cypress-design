# Modal — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-modal        # Vue
yarn add @cypress-design/react-modal      # React
```

## Props

| Prop                | Type        | Default       | Description                                                                                                  |
| ------------------- | ----------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `show`              | `boolean`   | `false`       | Controls visibility. Vue: bind with `v-model:show`. React: controlled — set it to `false` from `onClose`     |
| `title`             | `string`    | —             | Title text in the header bar                                                                                 |
| `helpLink`          | `string`    | —             | URL for a help link shown in the header. Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) |
| `helpLinkLabel`     | `string`    | `"Need help"` | Text of the help link. Only used when `helpLink` is set                                                      |
| `fullscreen`        | `boolean`   | `false`       | Expands modal to near-fullscreen dimensions                                                                  |
| `className` (React) | `string`    | —             | Extra classes added to the `<dialog>` element. In Vue, pass `class` on `<Modal>`; it lands on the `<dialog>` |
| `closeIcon` (React) | `ReactNode` | —             | Replaces the default ✕ icon inside the close button. In Vue, use the `closeIcon` slot                        |

The close button is always shown.

## Events

| Event               | Payload   | Description                                                                                                        |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `update:show` (Vue) | `boolean` | Emitted whenever the open state changes, including when the modal closes itself (close button, backdrop or Escape) |
| `close` (Vue)       | —         | Emitted whenever the modal closes: close button, backdrop click, Escape, or `show` set to `false`                  |
| `onClose` (React)   | —         | Called when the close button, backdrop or Escape is used. The modal stays open until you set `show` to `false`     |

In Vue, the close button, a backdrop click or Escape closes the modal on its own and frees the page scroll. In React, nothing closes until `show` changes — including on Escape, which calls `onClose` instead of closing the native `<dialog>` directly.

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

| Slot              | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `default`         | Main body content. In React, pass it as `children`                             |
| `closeIcon` (Vue) | Replaces the default ✕ icon inside the close button. In React, use `closeIcon` |
