---
name: components/Textbox/architecture
description: "How Textbox is built — file layout, the <label> wrapper, CSS-only state handling, focus and hover propagation, icon rendering, divider coupling, and extension points. Fetch alongside instructions.md when changing Textbox's implementation; skip when only using it."
---

# Textbox — architecture

How the Textbox component is built. Read this when extending, fixing, or rebuilding the component. For usage, see [instructions.md](https://design.cypress.io/agents/components/Textbox/instructions.md).

## File layout

```text
components/Textbox/
├── ReadMe.md                 # VitePress demo markup; not rendered by the docs site
├── instructions.md           # Consumer-facing usage doc
├── architecture.md           # This file — implementation notes
├── assertions.ts             # Shared Cypress assertions
├── constants/src/
│   ├── base-classes.ts       # Wrapper / input / label / size / input-container classes
│   ├── variant-classes.ts    # CssVariantClasses keyed by `${theme}-${variant}-default`
│   ├── icon-color-classes.ts # CssIconColorClasses keyed by `${theme}-${variant}-default`
│   └── index.ts              # Re-exports + TextboxProps + Default* values
├── react/{Textbox.tsx,ReadMe.md}
└── vue/{Textbox.vue,ReadMe.md}   # framework ReadMes: install, usage, docs-site examples
```

## Wrapper is a `<label>`

The outermost element is a `<label>`, not a `<div>`. This gives click-to-focus behavior on the entire control — including the labels, icons, and divider — without any JavaScript. It also makes the input's implicit label, so `labelLeft` / `labelRight` text feeds the input's accessible name. Do not replace the wrapper with a `<div>` without reimplementing both.

## State handling is CSS-only

State is driven by CSS pseudo-classes on the wrapper, not by a JS state prop or a discrete state key in constants. The variant class lookup is always `${theme}-${variant}-default`; the class string for that key includes modifiers like `hover:`, `focus-within:`, `has-[:disabled]:`, and `has-[:placeholder-shown]:` that the browser applies automatically.

Consequences:

- Adding a new variant or theme adds one constants key per combination, not six (one per state).
- Changing how a state looks means editing the class string for every `${theme}-${variant}-default` entry. Consider whether the change can be expressed on the shared `CssStaticClasses` instead.
- All focus styling uses `focus-within:`, so keyboard and mouse focus look identical. Distinguishing them means adding `focus-visible`-based modifiers to every variant string.

## Focus / hover propagation

Hover and focus styling must wrap the whole control and recolor the icons, not just the `<input>`. This is achieved by:

- Putting `hover:` / `focus-within:` modifiers on the wrapper's class string.
- Using Tailwind `group-*` modifiers in `CssIconColorClasses` so icons react to wrapper state.
- Using `outline` (not `border`) for the focus ring so layout doesn't shift between focused and unfocused states.

## Icon rendering

Icons passed via `iconLeft` / `iconRight` are rendered by `renderIcon` in React and by `<component :is>` in Vue:

- Components get `size="16"`, `interactiveColorsOnGroup` (so they pick up hover/focus colors from the wrapper's `group`), and `CssIconColorClasses[${theme}-${variant}-default]`.
- React only: a React element is wrapped in a `<span>` carrying the color classes; any other node gets a plain `shrink-0` span.

The component always applies these color classes, which is what locks icon color to the theme/variant.

## Divider coupling

The render condition is `divider && iconLeft`. For a right-side divider or one without a left icon, add a new prop — don't overload `divider`.

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

```text
<label>  (wrapper; carries the hover / focus-within / has-[...] state classes)
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

- Standard `<input>` attributes are spread onto the input element after component-owned props are destructured (React `...rest`, Vue `v-bind="$attrs"` with `inheritAttrs: false`). Don't add a prop that collides with a standard input attribute without renaming.
- Preserve the explicit-`aria-invalid`-wins-over-`variant` precedence when touching that computation.
