# Button — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-button        # Vue
yarn add @cypress-design/react-button      # React
yarn add @cypress-design/constants-button  # shared types
```

## Props

| Prop       | Type                                                                                                                                                                                                                                                                                                         | Default            | Description                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------------------------ |
| `variant`  | `"link" \| "white" \| "disabled" \| "outline-indigo" \| "outline-purple" \| "outline-gray" \| "outline-light" \| "outline-dark" \| "outline-disabled" \| "indigo-light" \| "jade-light" \| "jade-dark" \| "indigo-dark" \| "teal-dark" \| "purple-dark" \| "red-dark" \| "gray-dark" \| "gray-darkest" \| …` | `"outline-indigo"` | Visual style variant                             |
| `size`     | `"20" \| "24" \| "32" \| "40" \| "48"`                                                                                                                                                                                                                                                                       | `"32"`             | Button height in px                              |
| `disabled` | `boolean`                                                                                                                                                                                                                                                                                                    | `false`            | Disables the button and applies disabled styling |
| `href`     | `string`                                                                                                                                                                                                                                                                                                     | —                  | Renders as an `<a>` tag when provided            |
| `type`     | `"button" \| "reset" \| "submit"`                                                                                                                                                                                                                                                                            | `"button"`         | Native button type                               |
| `square`   | `boolean`                                                                                                                                                                                                                                                                                                    | `false`            | Equal width/height for icon-only buttons         |

## Events

| Event   | Payload      | Description           |
| ------- | ------------ | --------------------- |
| `click` | `MouseEvent` | Emitted on user click |

## Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| `default` | Button label and/or icon content |
