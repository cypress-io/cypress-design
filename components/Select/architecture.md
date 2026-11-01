---
name: components/Select/architecture
description: "How Select is built — file layout, state ownership, JS-driven focus, popover positioning and sizing, filtering, click-outside and ESC, trigger swap, custom rows, and extension points. Fetch alongside instructions.md when changing Select's implementation; skip when only using it."
---

# Select — architecture

How the Select component is built. Read this when extending, fixing, or rebuilding the component. For usage, see [`instructions.md`](https://design.cypress.io/agents/components/Select/instructions.md).

## File layout

```text
components/Select/
├── ReadMe.md                       # Public Astro/VitePress docs (live demos)
├── instructions.md                 # Consumer-facing usage doc
├── architecture.md                 # This file — implementation notes
├── assertions.ts                   # Shared Cypress assertions (open/close, selected, etc.)
├── constants/src/
│   ├── base-classes.ts             # Wrapper + trigger + popover + size classes
│   ├── option-item-classes.ts      # CssOptionItemClasses keyed by `${theme}-default`
│   ├── option-list-classes.ts      # Popover panel + header + footer classes per theme
│   ├── content-type-classes.ts     # Per-content-type row internals (checkbox, user, button, etc.)
│   └── index.ts                    # Re-exports + SelectProps + SelectItem types + Default* values
├── react/
│   ├── Select.tsx                  # Main; orchestrates trigger + popover
│   ├── SelectOptionList.tsx        # Panel; header + items + footer; filter logic
│   ├── SelectOptionItem.tsx        # Single row; dispatches on `type`
│   └── SelectReact.cy.tsx
└── vue/
    ├── Select.vue                  # Mirrors React orchestration
    ├── _SelectOptionList.vue       # Private sub-component
    ├── _SelectOptionItem.vue       # Private sub-component
    └── SelectVue.cy.tsx
```

The package exports three named components per framework: `Select` (default), `SelectOptionList`, and `SelectOptionItem`. `Select` is the entry point for all common use cases; the sub-components are exported so a consumer can reuse the popover panel inside their own popover plumbing (e.g. a Floating UI tooltip).

## Composition over invention

Select does not reimplement primitives that already exist in cypress-design. Specifically:

- **Default trigger** is a [`Button`](../Button/) rendering `{selectedLabel ?? placeholder}` followed by a chevron icon as the last child of the button's default slot. Button has no `iconRight` prop, so the chevron is just a child node. The chevron rotates 180° while `open === true`. Button's variant and size do the heavy lifting for hover, focus-visible, disabled visuals.
- **Header tabs** are the existing [`Tabs`](../Tabs/) component.
- **Search input** in the header is a [`Textbox`](../Textbox/) at a fixed `size="32"`, whatever the row size.
- **`type: 'checkbox'` rows** render the existing [`Checkbox`](../Checkbox/) component to the left of the label.
- **`type: 'button'` rows** render the existing [`Button`](../Button/) component.
- **`tag`** on default rows renders the existing [`Tag`](../Tag/) component.
- **All icons** (chevron, search, item `iconLeft`, the avatar of `type: 'user'` rows) go through [`@cypress-design/react-icon` / `vue-icon`](../Icon/). Select does not ship a custom Avatar component.

If you find yourself styling a checkbox or button by hand inside Select, stop — use the shared primitive instead.

## State ownership

There are three pieces of internal state:

1. **`open: boolean`** — popover visibility. Controlled when `open` prop is provided, uncontrolled otherwise (`useState(defaultOpen ?? false)`).
2. **`selectedValue: string | undefined`** — current selection. Controlled when `value` is provided, uncontrolled otherwise.
3. **`focusedIndex: number`** — index of the currently focused (keyboard-traversed) row among the interactive rows of the _filtered_ item list. `-1` means no row is focused; it resets to `-1` whenever the popover opens and whenever the displayed rows change, so the first arrow keypress lands focus.

Search input value (`searchValue`) is also internal state, owned by `Select` (not `SelectOptionList`). The popover receives it as a controlled prop and emits `update:searchValue` / calls `onSearchValueChange` when the input changes. Keeping it on `Select` is what makes keyboard nav and rendering agree on the filtered list — Select computes `displayItems = filterAndCollapseHeadlines(items, searchValue)` once and feeds it to OptionList; both keyboard traversal indices and rendered rows derive from the same array. Header active-tab is controlled by the consumer.

All four pieces of state live in `Select`. `SelectOptionList` receives them as props plus callback setters. `SelectOptionItem` is presentational only — it gets `selected`, `focused`, `disabled` booleans and a click handler.

## Why JS-driven focus (not real DOM focus)

Rows do not receive real DOM focus. Instead:

- The trigger (or the search Textbox, if the popover has a search input) keeps real DOM focus.
- The currently keyboard-focused row is marked with `data-focused="true"` and referenced from the focus owner via `aria-activedescendant`.
- The default trigger sets `role="combobox"` on its Button because `aria-activedescendant` isn't valid on the implicit `button` role.
- Hover and focus visuals share a single Tailwind line in the constants (`hover:... data-[focused=true]:...`) so the visual treatment is identical regardless of input modality.

This avoids the awkward "is the search input focused or is an option focused?" problem and matches the [ARIA combobox-with-listbox-popup pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

## Constants keying

| Constant                                                                        | Keys                | Purpose                                                                                                                                       |
| ------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `CssWrapperClasses`                                                             | —                   | Static classes on every Select wrapper                                                                                                        |
| `CssPopoverClasses`                                                             | `theme`             | Popover panel container (background, border, outline, rounding)                                                                               |
| `CssPopoverSizeClasses`                                                         | `size`              | Popover font size and line height, inherited by the rows                                                                                      |
| `CssOptionItemClasses`                                                          | `${theme}-default`  | Row classes. Includes hover, active, focus-visible, disabled, selected pseudo / data-attr modifiers in one string — same approach as Textbox. |
| `CssOptionItemHeightClasses`, `CssOptionItemPaddingClasses`                     | `size`              | Row min-height and padding                                                                                                                    |
| `CssDefaultRowClasses`, `CssCheckboxRow*`, `CssUserRow*`, `CssButtonRowClasses` | — or `theme`        | Per-content-type row internals, in `content-type-classes.ts`                                                                                  |
| `CssHeaderClasses`                                                              | `theme`             | Header bottom border                                                                                                                          |
| `CssFooterClasses`                                                              | `theme`             | Footer background + top border                                                                                                                |
| `CssAlignmentClasses`                                                           | `'left' \| 'right'` | Popover horizontal offset relative to the trigger                                                                                             |

Keying mirrors Textbox: every visual state for a given theme lives in a single class string with `:hover` / `data-[focused=true]:` / `data-[selected=true]:` / `aria-[disabled=true]:` modifiers. Adding a state means editing the strings, not adding new keys.

## Popover positioning

The popover is `position: absolute` inside a wrapper that's `position: relative`. The wrapper is the same DOM node as the trigger, so the popover is naturally anchored to it. `align` is implemented with `left-0` / `right-0` (no JS calculations).

There is no viewport collision detection; the consumer-facing rule is in `instructions.md` under "Dropdown sizing".

## Popover sizing

The `width`, `minWidth`, `maxWidth`, `height`, `maxHeight` props are applied as inline `style` properties on the popover panel — not as Tailwind classes. A small helper coerces incoming values to CSS strings (a plain `number` becomes `${n}px`; any other value is passed through unchanged so `'20rem'` or `'min(100vw, 320px)'` work).

Inline style is the right tool here because these dimensions are user-supplied at runtime and there is no closed set of values to enumerate as utility classes.

When `maxHeight` is set and the rows would overflow, the **items area** scrolls — the header and footer stay pinned. This is done with `display: flex; flex-direction: column` on the popover panel and `overflow-y: auto; flex: 1 1 auto; min-height: 0` on the items wrapper. Header and footer get `flex-shrink: 0`.

## Filtering

When `searchable` and `searchFilters` are both true, `Select` (not OptionList) owns the `searchValue` string and computes a derived `displayItems` array via `filterAndCollapseHeadlines(items, searchValue)` in `constants/src/filter-items.ts`. The filtered list is passed down to OptionList as the `items` prop; OptionList does no filtering of its own. Which rows survive is consumer-facing behavior, documented once under `searchFilters` in [`instructions.md`](https://design.cypress.io/agents/components/Select/instructions.md).

Custom filtering (fuzzy match, multi-field, async) is not built in. The consumer can pass an already-filtered `items` array and skip `searchable`.

## Click-outside and ESC

A capture-phase `mousedown` listener on `document` closes the popover when the event's target is outside both the wrapper and the popover. A `keydown` listener on the wrapper handles `Escape` and the arrow keys.

In Vue, the `mousedown` listener is added and removed by a `watch(open)` (and removed in `onBeforeUnmount`); `keydown` is a template `@keydown` on the wrapper. In React, the `mousedown` listener goes in a `useEffect` gated on `open`; `keydown` is the wrapper's `onKeyDown` prop.

## Trigger swap

The `trigger` prop (or `#trigger` slot in Vue) is a render-prop:

```tsx
trigger={({ open, selected, toggle, close }) => (
  <button onClick={toggle} aria-expanded={open}>
    {selected?.label ?? 'Pick one'}
  </button>
)}
```

When `trigger` is provided, Select:

- Does **not** render its default Button.
- Wraps the consumer's node in the same wrapper element (so the popover anchors correctly).
- Does **not** add ARIA attributes to the consumer's node — the consumer wires them via the render-prop context. Document this explicitly in `instructions.md`.

This is a deliberate choice: trying to auto-wire ARIA onto an arbitrary node is fragile (cloneElement + attribute merging issues). Pushing it to the consumer keeps the contract clean.

## Rendering `type: 'custom'` rows

`CustomItem.render(ctx)` is called inside the row container — Select still owns the row chrome (height, padding, hover styles), the consumer only fills the content. `ctx.selected` lets them mirror the selected state visually.

`value` is optional on custom items: if provided, the row is selectable; if omitted, the row behaves like `headline` (non-selectable, skipped during keyboard traversal).

## Extension points

- New content type → add a discriminated union variant to `SelectItem` in constants, add a branch in `SelectOptionItem`, add row classes to `content-type-classes.ts` if structural changes are needed. Update the keyboard-traversal "selectable types" allowlist in Select.
- New state → edit the relevant variant class string in `option-item-classes.ts`. Do not add a new constants key per state.
- New theme → add the theme to every theme-keyed constant (as `${theme}-default` in `CssOptionItemClasses`).
