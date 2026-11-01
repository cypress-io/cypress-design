---
name: components/Textbox/instructions
description: 'Textbox API — single-line text input with optional labels, icons, and divider: props, events, slots, states, and accessibility. Fetch when using, reviewing, or referencing Textbox in a Vue or React project.'
---

# Textbox — usage

How to use the Textbox component.

## What it is

A single-line text input with optional left/right labels, left/right icons, and an optional divider between the left icon and the input. The whole control is a `<label>` wrapping the `<input>`, so clicking any part of it focuses the input.

## Props

All props are optional. Framework differences are called out per prop. Vue uses kebab-case for attribute names and binds the value via `v-model` (which maps to the `modelValue` prop).

- **`theme`** — `'light' | 'dark'`, default `'light'`. Visual theme. The component does not follow system color scheme; pass `theme` explicitly.
- **`variant`** — `'default' | 'valid' | 'invalid' | 'warning'`, default `'default'`. Semantic variant. `'invalid'` sets `aria-invalid="true"` unless you pass `aria-invalid`.
- **`size`** — `'32' | '40' | '48'`, default `'40'`. Height in pixels (as a string).
- **`rounded`** — `boolean`, default `false`. Full-radius corners when `true`.
- **`labelLeft`** / **`labelRight`** — Static label rendered left / right of the input. React: `string | ReactNode`. Vue: pass a string; Vue renders it with text interpolation, so other values are stringified.
- **`iconLeft`** / **`iconRight`** — Icon rendered inside the input container, left / right of the input. Its color follows the theme/variant.
  - React: pass a function component (for example an icon from `@cypress-design/react-icon`), which is rendered with `size="16"` and the color classes, so its color can't be overridden. Or pass a React element, which is wrapped in a `<span>` carrying the color classes; only the span gets them, so the element's own color props or classes may win. Components wrapped in `forwardRef` or `memo` aren't functions and aren't supported — React throws "Objects are not valid as a React child". Pass them as an element instead (`iconLeft={<LucideIcon />}`).
  - Vue: pass a component; it is rendered with `size="16"` and the color classes.
- **`divider`** — `boolean`, default `false`. Vertical divider between `iconLeft` and the input. **Only renders when `iconLeft` is also provided.**
- **`disabled`** — `boolean`, default `false`. Disables the underlying `<input>`.
- **`placeholder`** — `string`. Standard HTML placeholder.
- **`value`** — `string`.
  - React: controlled value. If omitted (and `defaultValue` is also omitted), the component is uncontrolled.
  - Vue: optional override that takes precedence over `modelValue`. Most callers should use `v-model` / `modelValue` instead.
- **`defaultValue`** — `string` (React only). Uncontrolled initial value. Vue does not have an equivalent — initialize `modelValue` instead.
- **`modelValue`** — `string` (Vue only). Bound via `v-model`. Updates are emitted through `update:modelValue`.
- **`type`** — standard HTML input types, default `'text'`. Passed through to `<input>`.
- **`onChange`** — `(event: ChangeEvent<HTMLInputElement>) => void` (React only). Vue uses `v-model` / `@input`.
- **`aria-invalid`** — `boolean | 'true' | 'false' | 'grammar' | 'spelling'`. Defaults to `true` when `variant="invalid"`; otherwise unset. Pass it explicitly to override.

Other attributes go to the underlying `<input>` (e.g. `id`, `name`, `autocomplete`, `maxlength`, `aria-*`), including `style` in both frameworks. Only `class` differs:

- **React** — `className` goes on the wrapper `<label>`. All other props, including `style` and event handlers such as `onFocus` / `onKeyDown`, are spread onto the `<input>`. `ref` is forwarded to the `<input>`.
- **Vue** — `inheritAttrs: false` binds every non-prop attribute, including `class` and `style`, to the `<input>`, so there is no way to add a class to the wrapper. A template ref gives the component instance, not the input; reach the input with `ref.value.$el.querySelector('input')`.

## Events

**Vue only.** React uses the standard input handlers (`onChange`, `onFocus`, `onBlur`, `onKeyDown`, `onKeyUp`, …), which are passed to the `<input>`.

| Event               | Payload         | Description                                        |
| ------------------- | --------------- | -------------------------------------------------- |
| `update:modelValue` | `string`        | Emitted on every input change (use with `v-model`) |
| `input`             | `Event`         | Native input event from the underlying `<input>`   |
| `focus`             | `FocusEvent`    | Emitted when the input gains focus                 |
| `blur`              | `FocusEvent`    | Emitted when the input loses focus                 |
| `keydown`           | `KeyboardEvent` | Emitted on keydown inside the input                |
| `keyup`             | `KeyboardEvent` | Emitted on keyup inside the input                  |

```vue
<Textbox
  v-model="query"
  @keydown="(event: KeyboardEvent) => {
    // your code here
  }"
/>
```

## Slots

_None_ — pass content via props (`labelLeft`, `labelRight`, `iconLeft`, `iconRight`).

## States

The component styles the standard interactive states with CSS — no state prop to manage:

- `default` — has a value, no interaction.
- `placeholder` — input is empty and placeholder is shown.
- `hover` — mouse over the control.
- `focused` — the input has focus, from mouse, keyboard, or script. Keyboard and mouse focus look the same.
- `disabled` — the `disabled` prop is `true`. Overrides hover/focus visuals.

Hover and focus styling (border and outline ring) wraps the entire control, labels included, and icon colors change with it — not just the `<input>` element.

## Accessibility

- The `<input>` is wrapped in the component's `<label>`, and `labelLeft` / `labelRight` render as spans inside that `<label>`. Under the HTML-AAM label rules, their text becomes part of the input's accessible name; an `aria-label` or `aria-labelledby` on the input replaces it.
- If the label text isn't a meaningful name on its own (for example a `https://` prefix or a unit), or there is no label, give the input a name with `aria-label` or `aria-labelledby`. A placeholder is not a substitute.
- For error messaging, pair `variant="invalid"` with `aria-describedby` pointing at an error message element you render. The component does not render error text itself.

## References

- Light mode Figma: <https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=911-826>
- Dark mode Figma: <https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5752-24044>
