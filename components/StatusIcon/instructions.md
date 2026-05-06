# StatusIcon — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-statusicon          # Vue
yarn add @cypress-design/react-statusicon        # React
yarn add @cypress-design/constants-statusicon    # shared types
```

## Props

| Prop      | Type                                                                                                  | Default         | Description              |
| --------- | ----------------------------------------------------------------------------------------------------- | --------------- | ------------------------ |
| `status`  | `"passed" \| "failed" \| "pending" \| "skipped" \| "running" \| "notRun" \| "flaky" \| "placeholder"` | `"placeholder"` | Status to represent      |
| `variant` | `"simple" \| "outline" \| "solid"`                                                                    | `"simple"`      | Visual style of the icon |
| `size`    | `"24" \| "16" \| "12"`                                                                                | `"24"`          | Icon canvas size in px   |

## Events

_None._

## Slots

_None._
