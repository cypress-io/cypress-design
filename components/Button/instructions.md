# Button — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-button        # Vue
yarn add @cypress-design/react-button      # React
yarn add @cypress-design/constants-button  # shared types
```

## Props

| Prop       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         | Description                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`  | `"link" \| "white" \| "disabled" \| "disabled-dark-mode" \| "outline-indigo" \| "outline-purple" \| "outline-teal-dark" \| "outline-jade-light" \| "outline-jade-dark" \| "outline-red" \| "outline-gray-dark" \| "outline-light" \| "outline-gray-light" \| "outline-orange-dark" \| "outline-orange-light" \| "outline-disabled" \| "indigo-light" \| "jade-light" \| "jade-dark" \| "indigo-dark" \| "teal-dark" \| "purple-dark" \| "red-dark" \| "gray-dark" \| "gray-darkest" \| "outline-red-dark-mode" \| "outline-jade-dark-mode" \| "outline-indigo-dark-mode" \| "outline-purple-dark-mode" \| "outline-dark" \| "indigo-dark-mode" \| "red-dark-mode" \| "purple-dark-mode"` | `"indigo-dark"` | Visual style variant. `"disabled"`, `"outline-disabled"`, and `"disabled-dark-mode"` also disable the button                                   |
| `size`     | `"20" \| "24" \| "32" \| "40" \| "48"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `"40"`          | Button height in px                                                                                                                            |
| `disabled` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `false`         | Disables the button and applies disabled styling. Variants other than `white`, `outline-*`, and `*-dark-mode` switch to the `disabled` variant |
| `href`     | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | —               | Renders as an `<a>` tag when provided. When disabled, the link gets `aria-disabled="true"`                                                     |
| `target`   | `"_self" \| "_blank" \| "_parent" \| "_top"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | —               | Where to open the linked URL. Only applies with `href`                                                                                         |
| `type`     | `"button" \| "reset" \| "submit"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"button"`      | Native button type. Ignored when `href` is set                                                                                                 |
| `square`   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `false`         | Equal width/height for icon-only buttons                                                                                                       |

In React, `className` is merged with the component classes, and other native attributes are passed through to the rendered element.

## Events

| Event   | Payload      | Description           |
| ------- | ------------ | --------------------- |
| `click` | `MouseEvent` | Emitted on user click |

In React, pass an `onClick` prop instead.

### click

```vue
<Button
  @click="($event: MouseEvent) => {
    // your code here
  }"
/>
```

## Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| `default` | Button label and/or icon content |
