---
name: components/Tooltip/instructions
description: 'Tooltip API — tooltip shown on hover or controlled with the open prop: props, events, and slots. Fetch when using, reviewing, or referencing Tooltip in a Vue or React project.'
---

# Tooltip — Props, Events & Slots

Install and import: [React](https://design.cypress.io/agents/components/Tooltip/react/ReadMe.md) and [Vue](https://design.cypress.io/agents/components/Tooltip/vue/ReadMe.md). Both packages also export the Floating UI `Placement` type.

## Props

| Prop              | Type                                                                      | Default           | Description                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement`       | `"top" \| "bottom" \| "left" \| "right" \| "top-start" \| "top-end" \| …` | `"bottom"`        | Where the tooltip appears relative to the trigger. The default is Floating UI's; neither package sets its own.                                       |
| `color`           | `"light" \| "dark"`                                                       | `"light"`         | Tooltip background color                                                                                                                             |
| `disabled`        | `boolean`                                                                 | `false`           | Removes the tooltip content and disables hover and focus behavior                                                                                    |
| `open`            | `boolean`                                                                 | `false`           | `true` forces the tooltip open and disables hover, focus, and Escape. `false` leaves hover and focus in control; it cannot force the tooltip closed. |
| `interactive`     | `boolean`                                                                 | `false`           | When true, the tooltip stays open while the pointer moves from the trigger into it                                                                   |
| `forcePlacement`  | `boolean`                                                                 | `false`           | Prevents automatic flip to the opposite side                                                                                                         |
| `arrowPadding`    | `number`                                                                  | `24`              | Minimum space between the arrow and the tooltip edges                                                                                                |
| `shiftOptions`    | `ShiftOptions`                                                            | `{ padding: 16 }` | Floating UI `shift` middleware options                                                                                                               |
| `offsetOptions`   | `number \| OffsetOptions`                                                 | `16`              | Floating UI `offset` middleware options; a number is the distance from the trigger in px                                                             |
| `popper`          | `ReactNode`                                                               | —                 | **React only.** Tooltip content (Vue uses the `popper` slot)                                                                                         |
| `popperClassName` | `string`                                                                  | —                 | **React only.** Class for the floating tooltip container                                                                                             |

`className` / `class` and any other attributes land on the trigger wrapper, a plain block `<div>` around the trigger. Add `inline-block` (as the ReadMe examples do) when the wrapper should hug an inline trigger.

In React, Floating UI's handlers are spread after yours, so `onFocus`, `onBlur`, `onMouseMove`, `onMouseLeave`, `onPointerDown`, `onPointerEnter`, `onKeyDown` and `aria-describedby` passed to the Tooltip are overridden. Put those on the trigger element instead. In Vue, listeners passed to the Tooltip merge with its own.

## Events

_None_ — the tooltip manages its own show/hide via hover and focus (or the `open` prop).

## Trigger and content

- **Vue:** `default` slot = trigger, `popper` slot = tooltip content.
- **React:** `children` = trigger, `popper` prop = tooltip content.

## Accessibility

- The wrapper `<div>` is not focusable, so keyboard users need a focus target. In React, use a focusable trigger or add `tabIndex={0}` to the Tooltip. In Vue, add `tabindex="0"` to the Tooltip; a focusable trigger alone doesn't open it.
- React opens on keyboard focus of the wrapper or any element inside it: the focused element must match `:focus-visible`, so clicking a button doesn't open it. Vue listens for `focus` / `blur` on the wrapper `<div>` itself; those events don't bubble, so focus inside the wrapper doesn't open it.
- Escape closes the tooltip unless `open` is `true` (Vue: only while focus is inside the wrapper).
- React sets `aria-describedby` on the wrapper pointing at the `role="tooltip"` element while open. Vue renders `role="tooltip"` but sets no `aria-describedby`; add it yourself if the trigger needs to announce the content.
- Content is prefixed with visually hidden "Tooltip: " text. React mounts the content in `document.body` only while open; Vue keeps it in the DOM under `#portal-target`, hidden with `visibility: hidden` when closed.
