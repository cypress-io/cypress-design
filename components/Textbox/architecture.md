# Textbox — architecture

How the Textbox component is built. Read this when extending, fixing, or rebuilding the component. For usage, see [`instructions.md`](./instructions.md).

## File layout

```
components/Textbox/
├── ReadMe.md                 # Public VitePress docs (live demos)
├── instructions.md           # Consumer-facing usage doc
├── architecture.md           # This file — implementation notes
├── assertions.ts             # Shared Cypress assertions
├── constants/src/
│   ├── base-classes.ts       # Wrapper / input / label / size / input-container classes
│   ├── variant-classes.ts    # CssVariantClasses keyed by `${theme}-${variant}-default`
│   ├── icon-color-classes.ts # CssIconColorClasses keyed by `${theme}-${variant}-default`
│   └── index.ts              # Re-exports + TextboxProps + Default* values
├── react/Textbox.tsx
└── vue/Textbox.vue
```

## Wrapper is a `<label>`

The outermost element is a `<label>`, not a `<div>`. This gives click-to-focus behavior on the entire control — including the labels, icons, and divider — without any JavaScript. Do not replace the wrapper with a `<div>` unless you're prepared to reimplement click-to-focus manually.

## State handling is CSS-only

State is driven by CSS pseudo-classes on the wrapper, not by a JS state prop or a discrete state key in constants. The variant class lookup is always `${theme}-${variant}-default`; the class string for that key includes modifiers like `:hover`, `:focus-within`, `:focus-visible`, `has-[:disabled]:`, and `:placeholder-shown` that the browser applies automatically.

Consequences:

- Adding a new variant or theme adds one constants key per combination, not six (one per state).
- Changing how a state looks means editing the class string for every `${theme}-${variant}-default` entry. Consider whether the change can be expressed on the shared `CssStaticClasses` instead.
- True state-specific JS (e.g. distinguishing `:focus` from `:focus-visible` programmatically) is not supported today and would require restructuring.

## Focus / hover propagation

Hover and focus styling must reach labels and icons, not just the `<input>`. This is achieved by:

- Putting `:hover` / `:focus-within` modifiers on the wrapper's class string.
- Using Tailwind group-style descendant selectors inside the variant class strings so label and icon classes react to wrapper state.
- Using `outline` (not `border`) for the focus-visible ring so layout doesn't shift between focused and unfocused states.

## Icon rendering

Icons passed via `iconLeft` / `iconRight` are rendered through a helper that:

- Applies `CssIconColorClasses[${theme}-${variant}-default]` to whatever is passed.
- Sizes icon components to 16px.
- Sets `interactiveColorsOnGroup={true}` so icons pick up hover/focus color changes from the wrapper.
- Passes `React.isValidElement` nodes through with the color classes wrapped around them.

Because color classes are always applied by the component, consumers cannot override icon colors. Removing this lock is the main task required to address the corresponding limitation in `instructions.md`.

## Divider coupling

The divider is only rendered when **both** `divider={true}` **and** `iconLeft` is provided. There is no right-side divider, and no divider without a left icon. If you need either, add a new prop — don't overload `divider`.

## Constants keying summary

- **`CssVariantClasses`** — keyed by `${theme}-${variant}-default`. Full class string including pseudo-class modifiers.
- **`CssIconColorClasses`** — keyed by `${theme}-${variant}-default`. Includes `shrink-0`.
- **`CssRoundedClasses`** — keyed by `'true' | 'false'` (boolean coerced to string).
- **`CssWrapperHeightClasses`** — keyed by `'32' | '40' | '48'`. Height applied to the wrapper.
- **`CssInputContainerPaddingClasses`** — keyed by `'32' | '40' | '48'`. Padding of the inner input container.
- **`CssInputSizeClasses`** — keyed by `'32' | '40' | '48'`. Font size + line height on the `<input>`.
- **`CssInputClasses`** — keyed by `'light' | 'dark'`. Input text color per theme.
- **`CssLabelThemeClasses`** — keyed by `'light' | 'dark'`. Label background / text color.
- **`CssLabelBorderClasses`** — nested: `.left | .right` → theme. Separator border on left/right labels.
- **`CssLabelRoundedClasses`** — nested: `.left | .right` → rounded flag. Corner radius for left/right labels.
- **`DividerClasses`** — keyed by `'light' | 'dark'`. Divider color per theme.

## Component structure

Simplified render tree (React; Vue mirrors this):

```
<label>  (wrapper; handles hover/focus-within/focus-visible)
  {labelLeft && <span>…</span>}
  <div>  (inputContainer; padding + horizontal flex)
    {iconLeft && <IconLeft />}
    {divider && iconLeft && <div />}
    <input />
    {iconRight && <IconRight />}
  </div>
  {labelRight && <span>…</span>}
</label>
```

The `<label>` and input container are the only structural elements that always render. Labels, icons, and the divider are strictly opt-in.

## Forwarding and extension points

- React forwards `ref` to the inner `<input>`.
- Standard `<input>` attributes are spread onto the input element after component-owned props are destructured. Don't add a prop that collides with a standard input attribute without renaming.
- `aria-invalid` is auto-computed from `variant` but explicitly overridable — preserve that behavior.

## Planned / potential work

- Consumer-customizable icon colors — see `CssIconColorClasses` usage in the render helper.
- JS-driven `:focus` vs. `:focus-visible` differentiation, if needed for specific internals.
- Automatic light/dark theme detection tied to system preference.
