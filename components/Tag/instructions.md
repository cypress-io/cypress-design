# Tag — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-tag        # Vue
yarn add @cypress-design/react-tag      # React
```

## Props

| Prop    | Type                                                                                                | Default     | Description      |
| ------- | --------------------------------------------------------------------------------------------------- | ----------- | ---------------- |
| `color` | `"white" \| "gray" \| "gray-dark" \| "jade" \| "teal" \| "indigo" \| "purple" \| "red" \| "orange"` | `"indigo"`  | Tag color scheme |
| `size`  | `"16" \| "20" \| "24" \| "32"`                                                                      | `"24"`      | Tag height in px |
| `type`  | `"default" \| "default-outline" \| "dark" \| "dark-outline"`                                        | `"default"` | Surface style    |

## Events

_None._

## Slots

| Slot      | Description               |
| --------- | ------------------------- |
| `default` | Tag label text or content |
