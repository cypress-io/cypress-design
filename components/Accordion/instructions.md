# Accordion — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-accordion        # Vue
yarn add @cypress-design/react-accordion      # React
```

## Props

| Prop                   | Type                                          | Default | Description                                                                                                     |
| ---------------------- | --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `title`                | `string` (required)                           | —       | Header text displayed in the summary row                                                                        |
| `description`          | `string` (React also accepts `ReactNode`)     | —       | Secondary text displayed below the title                                                                        |
| `icon`                 | component                                     | —       | Icon displayed to the left of the title. Overridden by `iconEl`                                                 |
| `iconEl`               | `ReactNode` (React only)                      | —       | Element displayed to the left of the title; overrides `icon`. In Vue, use the `iconEl` slot                     |
| `separator`            | `boolean`                                     | `false` | Adds a vertical separator between the icon and the text. Only shows when there is an icon                       |
| `titleClassName`       | `string`                                      | —       | Replaces the title's default color classes (`text-indigo-500 block`)                                            |
| `descriptionClassName` | `string`                                      | —       | Replaces the description's default color class (`text-gray-700`)                                                |
| `headingClassName`     | `string`                                      | —       | Replaces the header's default background (`bg-white`)                                                           |
| `fullWidthContent`     | `boolean`                                     | `false` | Removes the padded wrapper around the body so content can run edge to edge                                      |
| `open`                 | `boolean`                                     | `false` | Expanded state. React keeps it in sync when the prop changes; Vue reads it only once, as the initial state      |
| `onClickSummary`       | `(event: MouseEvent) => boolean \| undefined` | —       | Called when the header is clicked, before toggling. Return `false` to skip the open-state update and `onToggle` |
| `onToggle`             | `(open: boolean) => void`                     | —       | Called with the new open state when the accordion opens or closes                                               |

In React, other native `<details>` attributes are passed through to the root element.

## Events

_None._ Neither framework emits events. Pass callbacks as props: `onToggle` for open/close changes and `onClickSummary` to intercept header clicks.

### onToggle

```vue
<Accordion
  title="Accordion title"
  :onToggle="(open: boolean) => {
    // your code here
  }"
/>
```

```tsx
<Accordion
  title="Accordion title"
  onToggle={(open: boolean) => {
    // your code here
  }}
/>
```

## Slots

| Slot      | Description                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `default` | Content rendered inside the expanded body                                                                  |
| `iconEl`  | Custom element to the left of the title (overrides `icon` prop). Vue only; in React, use the `iconEl` prop |
