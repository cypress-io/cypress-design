---
name: components/Modal/instructions
description: 'Modal API — native <dialog> modal: props (size, class overrides, footer, dismissal options), events, and slots, and how it closes in Vue vs React. Fetch when using, reviewing, or referencing Modal in a Vue or React project.'
---

# Modal — Props, Events & Slots

## Props

| Prop                   | Type                           | Default       | Description                                                                                                                    |
| ---------------------- | ------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `show`                 | `boolean`                      | `false`       | Controls visibility. Vue: bind with `v-model:show`. React: controlled — set it to `false` from `onClose`                       |
| `title`                | `string`                       | —             | Title text in the header bar                                                                                                   |
| `helpLink`             | `string`                       | —             | URL for a help link shown in the header. Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)                   |
| `helpLinkLabel`        | `string`                       | `"Need help"` | Text of the help link. Only used when `helpLink` is set                                                                        |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl'` | —             | Fixed width: 480, 592, 720 or 840px, never wider than the viewport minus 32px. Without it, the modal sizes to its content      |
| `fullscreen`           | `boolean`                      | `false`       | Expands modal to near-fullscreen dimensions. Takes precedence over `size`                                                      |
| `closeOnBackdropClick` | `boolean`                      | `true`        | Whether a click on the backdrop closes the modal. Set to `false` when a stray click would discard the user's input             |
| `closeOnEscape`        | `boolean`                      | `true`        | Whether Escape closes the modal                                                                                                |
| `className` (React)    | `string`                       | —             | Extra classes on the `<dialog>`, merged so they override the defaults (e.g. a custom width). In Vue, pass `class` on `<Modal>` |
| `titleBoxClassName`    | `string`                       | —             | Extra classes on the header bar, merged so they override the defaults                                                          |
| `contentClassName`     | `string`                       | —             | Extra classes on the body, merged so they override the defaults (e.g. `py-0`)                                                  |
| `footerClassName`      | `string`                       | —             | Extra classes on the footer bar, merged so they override the defaults. Only used when there is a footer                        |
| `footer` (React)       | `ReactNode`                    | —             | Content of a footer bar below the body, separated by a divider. In Vue, use the `footer` slot                                  |
| `closeIcon` (React)    | `ReactNode`                    | —             | Replaces the default ✕ icon inside the close button. In Vue, use the `closeIcon` slot                                          |

The close button is always shown, and it always closes the modal, whatever `closeOnBackdropClick` and `closeOnEscape` are set to. It shows a focus ring when reached from the keyboard.

The modal sets its own padding, borders and button styles, so it renders the same in apps that disable Tailwind's preflight.

## Events

| Event               | Payload   | Description                                                                                                        |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `update:show` (Vue) | `boolean` | Emitted whenever the open state changes, including when the modal closes itself (close button, backdrop or Escape) |
| `close` (Vue)       | —         | Emitted whenever the modal closes: close button, backdrop click, Escape, or `show` set to `false`                  |
| `onClose` (React)   | —         | Called when the close button, backdrop or Escape is used. The modal stays open until you set `show` to `false`     |

In Vue, the close button, a backdrop click or Escape closes the modal on its own and frees the page scroll. In React, nothing closes until `show` changes — including on Escape, which calls `onClose` instead of closing the native `<dialog>` directly.

A backdrop click with `closeOnBackdropClick` set to `false`, or Escape with `closeOnEscape` set to `false`, does nothing: Vue emits no event and React doesn't call `onClose`.

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

| Slot              | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `default`         | Main body content. In React, pass it as `children`                                     |
| `footer` (Vue)    | Content of a footer bar below the body, separated by a divider. In React, use `footer` |
| `closeIcon` (Vue) | Replaces the default ✕ icon inside the close button. In React, use `closeIcon`         |
