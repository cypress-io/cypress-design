# Textbox — usage

How to use the Textbox component. Anything documented here is supported; anything missing isn't.

## What it is

A single-line text input with optional left/right labels, left/right icons, and an optional divider between the left icon and the input. Clicking any part of the control focuses the input.

## Props

All props are optional unless noted. React and Vue expose the same prop surface, with framework-idiomatic differences called out per prop. Vue uses kebab-case for attribute names and binds the value via `v-model` (which maps to the `modelValue` prop).

- **`theme`** — `'light' | 'dark'`, default `'light'`. Visual theme.
- **`variant`** — `'default' | 'valid' | 'invalid' | 'warning'`, default `'default'`. Semantic variant. `'invalid'` auto-sets `aria-invalid="true"` unless overridden.
- **`size`** — `'32' | '40' | '48'`, default `'40'`. Height in pixels (as a string).
- **`rounded`** — `boolean`, default `false`. Full-radius corners when `true`.
- **`labelLeft`** — `string | ReactNode` (React) / `string` (Vue). Static label rendered left of the input. Vue currently renders this via text interpolation, so non-string values will stringify.
- **`labelRight`** — `string | ReactNode` (React) / `string` (Vue). Static label rendered right of the input. Vue currently renders this via text interpolation, so non-string values will stringify.
- **`iconLeft`** — Icon component or node. Rendered inside the input container, left of the input.
- **`iconRight`** — Icon component or node. Rendered inside the input container, right of the input.
- **`divider`** — `boolean`, default `false`. Vertical divider between `iconLeft` and the input. **Only renders when `iconLeft` is also provided.**
- **`disabled`** — `boolean`, default `false`. Disables the underlying `<input>`.
- **`placeholder`** — `string`. Standard HTML placeholder.
- **`value`** — `string`.
  - React: controlled value. If omitted (and `defaultValue` is also omitted), the component is uncontrolled.
  - Vue: optional override that takes precedence over `modelValue`. Most callers should use `v-model` / `modelValue` instead.
- **`defaultValue`** — `string` (React only). Uncontrolled initial value. Vue does not have an equivalent — initialize `modelValue` instead.
- **`modelValue`** — `string` (Vue only). Bound via `v-model`. Updates are emitted through `update:modelValue`.
- **`type`** — standard HTML input types, default `'text'`. Passed through to `<input>`.
- **`onChange`** — `(event) => void` (React). Standard change handler. Vue uses `v-model` / `@input`.
- **`aria-invalid`** — `boolean`. Defaults to `true` when `variant="invalid"`; otherwise undefined. Override explicitly to opt out.

Any other standard `<input>` attributes (e.g. `name`, `autocomplete`, `maxlength`, `aria-*`, event handlers) are forwarded to the underlying `<input>`. React forwards `ref` to the `<input>` element.

## Events

| Event               | Payload         | Description                                        |
| ------------------- | --------------- | -------------------------------------------------- |
| `update:modelValue` | `string`        | Emitted on every input change (use with `v-model`) |
| `input`             | `Event`         | Native input event from the underlying `<input>`   |
| `focus`             | `FocusEvent`    | Emitted when the input gains focus                 |
| `blur`              | `FocusEvent`    | Emitted when the input loses focus                 |
| `keydown`           | `KeyboardEvent` | Emitted on keydown inside the input                |
| `keyup`             | `KeyboardEvent` | Emitted on keyup inside the input                  |

### update:modelValue

```vue
<Textbox
  @update:modelValue="(value: string) => {
    // your code here
  }"
/>
```

### input

```vue
<Textbox
  @input="(event: Event) => {
    // your code here
  }"
/>
```

### focus

```vue
<Textbox
  @focus="(event: FocusEvent) => {
    // your code here
  }"
/>
```

### blur

```vue
<Textbox
  @blur="(event: FocusEvent) => {
    // your code here
  }"
/>
```

### keydown

```vue
<Textbox
  @keydown="(event: KeyboardEvent) => {
    // your code here
  }"
/>
```

### keyup

```vue
<Textbox
  @keyup="(event: KeyboardEvent) => {
    // your code here
  }"
/>
```

## Slots

_None_ — the component renders its own internal structure. Pass content via props (`labelLeft`, `labelRight`, `iconLeft`, `iconRight`).

## States

The component responds to the standard interactive states automatically — no state prop to manage:

- `default` — has a value, no interaction.
- `placeholder` — input is empty and placeholder is shown.
- `hover` — mouse over the control.
- `active` / focused — input is focused via mouse or programmatically.
- `focus-visible` — input received focus via keyboard (Tab).
- `disabled` — the `disabled` prop is `true`. Overrides hover/focus visuals.

State priority: `disabled` > `focus-visible` > `active/focused` > `hover` > `placeholder` > `default`.

Hover, active, and focus styling applies to the entire control — labels and icons visually respond alongside the input, not just the `<input>` element.

## Accessibility

- The component provides an implicit label association for the inner input. Clicking anywhere in the control focuses it.
- `aria-invalid` is set automatically when `variant="invalid"`; callers can override.
- **`labelLeft` / `labelRight` are decorative** — they are not `<label for>` associations. If the Textbox has no other visible heading or associated label, provide `aria-label` or `aria-labelledby`.
- For error messaging, pair `variant="invalid"` with `aria-describedby` pointing at an external error message element. The component does not render error text itself.

## Known limitations

- **Icon colors cannot be overridden by the consumer.** They're locked to the active theme/variant combination.
- **No automatic light/dark switching** based on system preference — pass `theme` explicitly.
- Extending state behavior beyond the built-in pseudo-class-driven states may require code changes in the component itself (see `architecture.md`).

## References

- [Live demos](./ReadMe.md) render on the design system site.
- Light mode Figma: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=911-826
- Dark mode Figma: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5752-24044
- Implementation details: [`architecture.md`](./architecture.md)
