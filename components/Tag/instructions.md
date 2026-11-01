---
name: components/Tag/instructions
description: 'Tag API — small colored label: props, events, and slots. Fetch when using, reviewing, or referencing Tag in a Vue or React project.'
---

# Tag — Props, Events & Slots

## Props

| Prop      | Type                                                                                                | Default    | Description                                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`   | `"white" \| "gray" \| "gray-dark" \| "jade" \| "teal" \| "indigo" \| "purple" \| "red" \| "orange"` | — required | Color scheme. Has no default: omitting it throws at render                                                                                                                      |
| `size`    | `"16" \| "20" \| "24" \| "32"`                                                                      | — required | Height in px. Has no default: omitting it renders a tag with no size classes                                                                                                    |
| `dark`    | `boolean`                                                                                           | `false`    | Selects the stronger filled style for the color (for most colors a 500 fill with white text, e.g. `bg-indigo-500 text-white`). It is not a dark-mode variant                    |
| `outline` | `boolean`                                                                                           | `false`    | Changes only the border to a different shade (usually one step darker, e.g. `border-indigo-100` → `border-indigo-200`); background and text stay the same. Combines with `dark` |

React only: `children` is required, and `className` plus any other `<span>` attributes are forwarded to the root `<span>`. The package exports the `TagProps` type.

Vue only: `class` and other attributes fall through to the root `<span>`.

## Events

_None._ DOM event handlers such as `onClick` (React) or `@click` (Vue) are forwarded to the root `<span>` like any other attribute.

## Slots

| Slot      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `default` | Tag label text or content. Vue only — in React, pass `children` |

## Accessibility

- Tag renders a plain `<span>` with no role, ARIA attributes, or focus handling. Screen readers read its text inline.
- Color carries no meaning to assistive tech. Put the meaning in the label text (for example "Failed", not a red tag with no word); don't rely on color alone.
- Tag is not interactive. If it must act as a control, put it inside a real `<button>` or `<a>` rather than adding a click handler to the tag.
