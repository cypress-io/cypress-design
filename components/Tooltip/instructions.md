# Tooltip — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-tooltip        # Vue
yarn add @cypress-design/react-tooltip      # React
```

## Props

| Prop             | Type                                                                      | Default           | Description                                                                                              |
| ---------------- | ------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `placement`      | `"top" \| "bottom" \| "left" \| "right" \| "top-start" \| "top-end" \| …` | `"top"`           | Where the tooltip appears relative to the target                                                         |
| `color`          | `"light" \| "dark"`                                                       | `"light"`         | Tooltip background color                                                                                 |
| `disabled`       | `boolean`                                                                 | `false`           | Hides the tooltip and disables hover behavior                                                            |
| `open`           | `boolean`                                                                 | —                 | Controlled open state (bypasses hover)                                                                   |
| `interactive`    | `boolean`                                                                 | `false`           | When true, the tooltip stays open when the pointer moves into it, and Tab moves into it from the trigger |
| `forcePlacement` | `boolean`                                                                 | `false`           | Prevents automatic flip to opposite side                                                                 |
| `arrowPadding`   | `number`                                                                  | `24`              | Space between the arrow and tooltip edges                                                                |
| `shiftOptions`   | `ShiftOptions`                                                            | `{ padding: 16 }` | Floating UI shift middleware options                                                                     |
| `offsetOptions`  | `OffsetOptions`                                                           | `16`              | Distance from the reference element in px                                                                |

## Events

_None_ — the tooltip manages its own show/hide via hover and keyboard focus (or the `open` prop for controlled use).

## Slots

| Slot      | Description                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `default` | The trigger element the tooltip is attached to. Vue passes `{ describedBy }`, the id of the tooltip content, for `aria-describedby` |
| `popper`  | Content rendered inside the tooltip bubble                                                                                          |

## Accessibility

### Keyboard

| Key       | Where                                  | Behavior                                                                                         |
| --------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Tab       | Onto the trigger                       | Opens the tooltip. Keyboard focus only: a mouse click on the trigger doesn't pin it open         |
| Tab       | On the trigger, `interactive` and open | Moves focus to the first focusable element in the tooltip (disabled and `tabindex="-1"` skipped) |
| Shift+Tab | On the first focusable in the tooltip  | Returns focus to the trigger                                                                     |
| Tab       | On the last focusable in the tooltip   | Continues to the page control after the trigger, and closes the tooltip                          |
| Escape    | On the trigger or inside the tooltip   | Closes the tooltip and leaves focus on the trigger                                               |

The trigger has to be focusable. Use a native `<button>` or `<a href>` in the default slot, or put `tabindex="0"` on the Tooltip itself when the wrapper is the trigger.

The tooltip is rendered in a portal at the end of `<body>`, so it's never reached by plain tab order. The keyboard handling above is what makes links in an `interactive` tooltip reachable; don't add your own focus trap.

### Screen readers

The tooltip content has an id, and the trigger should point at it with `aria-describedby` so the copy is read as the trigger's description.

- **Vue:** the default slot passes `describedBy`. Bind it to your trigger: `<template #default="{ describedBy }"><button :aria-describedby="describedBy">…</button></template>`. When the Tooltip itself has a `tabindex`, it sets `aria-describedby` on its own wrapper. The value is only set after mount, once the tooltip content is in the DOM, so it never points at a missing id.
- **React:** `aria-describedby` is set on the Tooltip wrapper while the tooltip is open. Put `tabIndex={0}` on the Tooltip so the wrapper is the trigger.
