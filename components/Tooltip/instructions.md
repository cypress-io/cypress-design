# Tooltip — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-tooltip        # Vue
yarn add @cypress-design/react-tooltip      # React
```

## Props

| Prop             | Type                                                                      | Default           | Description                                                      |
| ---------------- | ------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------- |
| `placement`      | `"top" \| "bottom" \| "left" \| "right" \| "top-start" \| "top-end" \| …` | `"top"`           | Where the tooltip appears relative to the target                 |
| `color`          | `"light" \| "dark"`                                                       | `"light"`         | Tooltip background color                                         |
| `disabled`       | `boolean`                                                                 | `false`           | Hides the tooltip and disables hover behavior                    |
| `open`           | `boolean`                                                                 | —                 | Controlled open state (bypasses hover)                           |
| `interactive`    | `boolean`                                                                 | `false`           | When true, the tooltip stays open when the pointer moves into it |
| `forcePlacement` | `boolean`                                                                 | `false`           | Prevents automatic flip to opposite side                         |
| `arrowPadding`   | `number`                                                                  | `24`              | Space between the arrow and tooltip edges                        |
| `shiftOptions`   | `ShiftOptions`                                                            | `{ padding: 16 }` | Floating UI shift middleware options                             |
| `offsetOptions`  | `OffsetOptions`                                                           | `16`              | Distance from the reference element in px                        |

## Events

_None_ — the tooltip manages its own show/hide via hover (or the `open` prop for controlled use).

## Slots

| Slot      | Description                                    |
| --------- | ---------------------------------------------- |
| `default` | The trigger element the tooltip is attached to |
| `popper`  | Content rendered inside the tooltip bubble     |
