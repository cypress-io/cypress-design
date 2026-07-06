# Select — usage

How to use the Select component. Anything documented here is supported; anything missing isn't.

## What it is

A single-select dropdown. The trigger is a [`Button`](../Button/instructions.md) by default (showing the selected label followed by a chevron icon), but can be swapped for any other element via the `trigger` slot. The popover panel ("Option List") shows a list of rows ("Option Items") of several content types, with optional header (title, tabs, search) and footer.

Select composes existing cypress-design primitives — Button, Tabs, Checkbox, Textbox (for the search input), Tag, Icon — so consumers get a consistent look without taking a dependency on `react-select` or other third-party dropdown libraries.

## When to use

Use Select when the user picks **one value from a list** and that value sets state — a form field, a filter, an assignment. The selected value should be worth showing on the trigger after the popover closes ("Assignee: Jordan Lee").

Reach for it when:

- There are **5 or more options.** Fewer than that, prefer a control that keeps every option visible (radio-style rows or a segmented control) — hiding four choices behind a click costs more discoverability than it saves in space.
- **Space is constrained.** A Select trades one click for a compact footprint. If the page has room to show the options inline, showing them is usually the better UX.
- The options are **nouns, not actions.** Rows name things the user chooses between (projects, people, branches).

## When to use something else

- **Switching views** → [Tabs](../Tabs/instructions.md). If choosing an option changes what's on screen rather than setting a value, it's a view switch, not a selection.
- **Navigation** → Menu (when it lands). Rows that take the user somewhere are links, not values.
- **Mostly actions** → not a Select. One `type: 'button'` row for an action tightly coupled to the list (like "+ Add new") is fine; if most rows _do_ something instead of _being_ something, you want a dropdown-menu pattern instead.
- **Free-text input with suggestions** → [Textbox](../Textbox/instructions.md). Select's search filters a closed list; it does not accept values outside `items`.
- **Choosing several values** → nothing yet. Select is single-select; multi-select is planned (see Known limitations). Don't simulate it with `type: 'checkbox'` rows — they toggle a single value, not a set.

## Content guidelines

- Keep labels **short, parallel, and front-loaded** — put the differentiating word first ("Staging — us-east", not "The us-east staging environment"). Labels truncate rather than wrap.
- **Order for the user, not the data.** Recency or frequency beats alphabetical when a "Recent" group exists; alphabetical beats insertion order everywhere else.
- Add `searchable` past roughly **10–15 items**; add `headline` groups when the categories mean something to the user, not just to the schema.
- Keep a `disabled` row visible only when seeing it helps ("Epsilon — upgrade to enable"). If the reason it's unavailable doesn't matter to the user, omit the row.
- Always give the trigger a `placeholder` (or `triggerAriaLabel` when icon-only) — an unnamed combobox fails both usability and axe.

## Install

```bash
yarn add @cypress-design/vue-select         # Vue
yarn add @cypress-design/react-select       # React
```

Shared types (`SelectItem`, `SelectProps`, etc.) are re-exported from each framework package — no separate constants install needed.

The default export is the full `Select` (trigger + popover). The panel pieces are also exported for consumers who want to render the popover inline without a trigger (e.g. expanded showcases, or building a custom shell):

```ts
// Vue
import {
  Select,
  SelectOptionList,
  SelectOptionItem,
} from '@cypress-design/vue-select'

// React
import {
  Select,
  SelectOptionList,
  SelectOptionItem,
} from '@cypress-design/react-select'
```

## Props

All props are optional unless noted. React and Vue expose the same prop surface, with framework-idiomatic differences called out per prop. Vue uses kebab-case for attribute names and binds the value via `v-model` (mapped to `modelValue`) and the open state via `v-model:open`.

### Selection & data

- **`items`** — `SelectItem[]`, **required**. The list of rows to render. See "Item shapes" below.
- **`value`** — `string`. Controlled selected value (must match an item's `value`).
  - React: controlled prop. If omitted (and `defaultValue` is also omitted), the component is uncontrolled.
  - Vue: optional override that takes precedence over `modelValue`. Most callers should use `v-model` / `modelValue` instead.
- **`defaultValue`** — `string` (React only). Uncontrolled initial value.
- **`modelValue`** — `string` (Vue only). Bound via `v-model`. Updates are emitted through `update:modelValue`.
- **`onChange`** — `(value: string | undefined, item: SelectItem) => void` (React). Vue uses `@update:modelValue`. The `value` payload is `undefined` when the selection is cleared (e.g. a `checkbox` row toggled off — see Item shapes / `checkbox` below).
- **`placeholder`** — `string`. Shown on the default trigger when nothing is selected.

### Appearance

- **`theme`** — `'light' | 'dark'`, default `'light'`. Visual theme. Applied to both the trigger and the popover.
- **`size`** — `'32' | '40'`, default `'32'`. Height (in pixels, as a string) of the default trigger and of each option row.
- **`triggerVariant`** — `ButtonVariant`, default `'outline-gray-light'`. Forwarded to the default Button trigger. See [Button instructions](../Button/instructions.md) for the full set of variants. Ignored when a custom `trigger` slot is supplied.
- **`align`** — `'left' | 'right'`, default `'left'`. Horizontal alignment of the popover relative to the trigger. `'left'` aligns the popover's left edge to the trigger's left edge; `'right'` aligns the right edges.
- **`disabled`** — `boolean`, default `false`. Disables the trigger and prevents opening the popover.

### Dropdown sizing

These apply to the popover panel only — the trigger keeps its natural width. Accept any CSS length string (e.g. `'320px'`, `'20rem'`, `'100%'`) or a plain number (interpreted as pixels). Omit for natural sizing.

- **`width`** — fixed width of the popover.
- **`minWidth`** — minimum width.
- **`maxWidth`** — maximum width.
- **`height`** — fixed height. Pair with `maxHeight` only if you also want the list to scroll past that height; usually you only need `maxHeight`.
- **`maxHeight`** — maximum height. When the rendered rows exceed this, the items area scrolls. Headers and footers stay pinned.

### Open / close state

- **`defaultOpen`** — `boolean`, default `false`. Uncontrolled initial open state. The Figma "Dropdown visibility" toggle maps to this.
- **`open`** — `boolean`. Fully controlled open state. Pair with `onOpenChange`.
- **`onOpenChange`** — `(open: boolean) => void`. Fires when the popover opens or closes (whether controlled or uncontrolled).

### Header

The header is rendered above the items when at least one header prop is set. It has two layers, each optional:

1. **Title row** — back button · iconLeft · title · tag · iconRight. Any combination, all optional.
2. **Tabs + search row** — appears below the title row when `headerTabs` or `searchable` is set.

Each layer carries its own bottom border, so when both layers are present you get two visual dividers.

- **`headerTitle`** — `string`. Title text. Font scales with `size`: 14/20 at `size='32'`, 16/24 at `size='40'`. Color: gray-900 (light) / gray-300 (dark).
- **`headerButton`** — `{ iconLeft: IconNode; onClick: () => void; ariaLabel?: string }`. Optional 32×32 square back-button on the left edge of the title row. Auto-themed: `white` variant on light, `outline-dark` on dark.
- **`headerIconLeft`** — `IconNode`. Optional 16px icon shown between the back button and the title.
- **`headerTag`** — `string`. Optional small gray `Tag` (size 16, theme-aware) rendered after the title.
- **`headerIconRight`** — `IconNode`. Optional 16px icon pushed to the far right of the title row.
- **`headerTabs`** — `Tab[]`. Renders a [`Tabs`](../Tabs/instructions.md) row inside the header. Use with `headerActiveTab` and `onHeaderTabChange`. Variant auto-selected by theme + size: `default` on light, `dark-small` (h-20/12px) at `size='32'` on dark, `dark-large` (h-24/14px) at `size='40'` on dark.
- **`headerActiveTab`** — `string`. ID of the currently active tab. Controlled.
- **`onHeaderTabChange`** — `(id: string) => void` (React) / `@header-tab-change` (Vue). Fired when the user switches tabs.
- **`searchable`** — `boolean`, default `false`. Renders a search [`Textbox`](../Textbox/instructions.md) in the header. When `searchFilters` is `true` (the default), the input value filters `items` by case-insensitive substring match against each item's `label`.
- **`searchPlaceholder`** — `string`, default `'Search'`. Placeholder for the search Textbox.
- **`searchFilters`** — `boolean`, default `true`. Set to `false` to keep the search Textbox visible without filtering — useful for showcase pages where every row should stay visible regardless of what the user types.

### Footer

The footer is rendered below the items when at least one footer prop is set.

- **`footer`** — `ReactNode | string` (React) / slot `#footer` (Vue). Arbitrary footer content. Takes precedence over the shorthand props below.
- **`footerLabel`** — `string`. Shorthand: shows a left-aligned label inside the footer row.
- **`footerAction`** — `{ label: string; onClick: () => void }`. Shorthand: shows a right-aligned action button using cypress-design's Button.

### Trigger

- **`trigger`** — `ReactNode | ((ctx) => ReactNode)` (React) / slot `#trigger="{ ctx }"` (Vue). Escape hatch to replace the default Button trigger. The render context (`ctx`) exposes `{ open: boolean, selected: SelectItem | null, toggle: () => void, close: () => void }`. The consumer is responsible for calling `toggle()` or `close()` on whatever element they render; Select still owns the popover.

### Extension

- **`className`** — applied to the outer wrapper element.
- **`popoverClassName`** (React) / **`popoverClass`** (Vue) — applied to the popover panel.

## Item shapes

`items` is a discriminated union. The `type` field picks the row content. Required fields differ per type.

```ts
type SelectItem =
  | DefaultItem
  | HeadlineItem
  | DividerItem
  | CheckboxItem
  | UserItem
  | ButtonItem
  | CustomItem
```

### `default` (selectable)

```ts
interface DefaultItem {
  type?: 'default' // default when type is omitted
  value: string // selection key; emitted via onChange
  label: string // primary text
  iconLeft?: IconNode // 16px leading icon — picks up state-aware coloring (gray → indigo on hover/focus/active/selected, muted on disabled)
  iconRight?: IconNode // 16px trailing icon — same state-aware coloring as iconLeft, hugs the right edge
  slotRight?: ReactNode // escape hatch for arbitrary trailing content (badges, counts); sits right of iconRight if both are provided
  tag?: string | TagProps // small Tag rendered after the label
  disabled?: boolean
}
```

### `headline` (non-selectable)

```ts
interface HeadlineItem {
  type: 'headline'
  label: string // rendered as a section heading
}
```

### `divider` (non-selectable)

```ts
interface DividerItem {
  type: 'divider'
}
```

### `checkbox` (selectable, single-select with toggle-off)

Visual affordance only — the row shows a Checkbox that mirrors the row's selected state. Select remains single-select, but clicking the row toggles: first click selects, clicking the already-checked row **deselects** (emits `undefined` through `onChange` / `update:modelValue`). The popover stays open on checkbox click, since users are typically picking from a multi-pick-shaped list.

```ts
interface CheckboxItem {
  type: 'checkbox'
  value: string
  label: string
  subText?: string // secondary text rendered under the label
  disabled?: boolean
}
```

### `user` (selectable)

Avatar + name + secondary text (e.g. email or SSO provider). The avatar is whatever Icon node the consumer passes via `iconLeft` — Select does not ship its own Avatar component.

```ts
interface UserItem {
  type: 'user'
  value: string
  label: string // primary text (e.g. user name)
  secondary?: string // secondary text (e.g. email — Enterprise SSO)
  iconLeft?: IconNode
}
```

### `button` (non-selectable, action row)

```ts
interface ButtonItem {
  type: 'button'
  key: string // stable React/Vue key
  label: string
  onClick: () => void
  iconLeft?: IconNode // optional 16px icon rendered inside the Button before the label
  variant?: ButtonVariant // forwarded to <Button>; defaults to theme-aware `white` (light) / `outline-dark` (dark)
}
```

The Button's `size` is auto-scaled with the panel's `size`: `'24'` at `size='32'` and `'32'` at `size='40'`.

### `custom` (escape hatch)

Full control over the row's interior. Useful for shapes the built-in types don't cover. Provide a `value` to make the row selectable; omit it for a non-selectable row.

```ts
interface CustomItem {
  type: 'custom'
  value?: string
  // Optional text label shown by the default Select trigger when this row
  // is selected. Without it, the trigger keeps the placeholder. Use the
  // `trigger` slot / render-prop if you need richer trigger content.
  label?: string
  render: (ctx: { selected: boolean }) => ReactNode
}
```

## Events

| Event                  | Payload                                      | Description                                                                                  |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `update:modelValue`    | `string \| undefined`                        | Vue — emitted whenever the selection changes. `undefined` when cleared (checkbox toggle-off) |
| `update:open`          | `boolean`                                    | Vue — emitted whenever the popover opens / closes                                            |
| `change`               | `string \| undefined, SelectItem`            | Vue — same payload as `update:modelValue`, plus the item that triggered the change           |
| `onChange` (React)     | `(value: string \| undefined, item) => void` | Selection changed; `value` is `undefined` when cleared                                       |
| `onOpenChange` (React) | `(open) => void`                             | Popover open state changed                                                                   |

## Slots (Vue only)

- **`#trigger="{ open, selected, toggle, close }"`** — replace the default Button trigger. The consumer is responsible for calling `toggle()` or `close()` on the rendered element; Select still owns the popover.
- **`#footer`** — arbitrary footer content (takes precedence over `footerLabel` / `footerAction`). Useful for rich footers like the multi-line info pattern in the demo.

## States

The Option Item responds to the following states (all visible in the Figma):

- `default` — base.
- `hover` — mouse over the row.
- `active` — mouse pressed on the row.
- `selected` — row's `value` matches the current selection.
- `focus-visible` — row received focus via keyboard (Tab or Arrow keys).
- `disabled` — `item.disabled === true`. Overrides hover/active visuals.

State priority: `disabled` > `focus-visible` > `active` > `hover` > `selected` > `default`.

The Trigger inherits Button's states (`default`, `hover`, `focused`, `focus-visible`, `disabled`) and adds an open-popover state that mirrors `focus-within`.

## Accessibility

- Trigger is a `<button type="button">` (Cypress `Button` component) with `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls` pointing at the inner listbox. WAI-ARIA 1.2 broadened the combobox pattern to cover a "select-only combobox" whose value comes from a closed list of options — a trigger button that reveals a listbox is exactly that shape. `role="combobox"` also lets the trigger legally carry `aria-activedescendant` (a plain `role="button"` does not), which the keyboard-nav story below depends on. The trigger takes its accessible name from `aria-label` (author-sourced, per the combobox `nameFrom` rule) — the default is the visible label / placeholder; consumers can override with `triggerAriaLabel`, required when the trigger renders icon-only.
- Popover has `role="listbox"` scoped to the option items only (not the whole panel — otherwise axe's `aria-required-children` flags header buttons, tabs, search inputs, and footer actions as illegal listbox children). The listbox carries an `aria-label` so screen readers announce it on open. The label is `headerTitle` when set, otherwise the literal string `"Options"`.
- Selectable rows have `role="option"` + `aria-selected`. `button` rows carry `role="option"` on the inner `<Button>` (with `tabindex="-1"`) so the listbox sees only valid option children; the wrapper stays `role="presentation"` and hosts the focus-ring styling. `headline` and `divider` are `role="presentation"`; `divider` also has `aria-hidden="true"`.
- Disabled rows have `aria-disabled="true"` (they are `<div>` elements, not `<button>` / `<input>`, so the HTML `disabled` attribute does not apply).
- `aria-activedescendant` lives on whichever element currently has DOM focus, per WAI-ARIA. When `searchable` is off, focus stays on the trigger and the trigger carries the attribute. When `searchable` is on, focus lands on the header search Textbox and the Textbox carries it — the trigger drops it in that mode so no two elements advertise the same active descendant at once. The visual focus ring is driven by `data-focused="true"` on the row, not by DOM focus.
- Keyboard support:
  - `Enter` / `Space` on the trigger → toggle open.
  - `ArrowDown` on the trigger → open (does not focus a row yet; the next arrow keypress lands focus — see below).
  - Open with no row focused. The first `ArrowDown` lands focus on the first interactive row; the first `ArrowUp` lands focus on the last. Subsequent `ArrowUp` / `ArrowDown` walk previous / next interactive rows (skipping `headline`, `divider`, and `disabled`). **`button` rows are included** so in-list actions are reachable by keyboard.
  - `Enter` on a focused row → select + close (for selectable rows), or fire the row's `onClick` (for `button` rows, which stay open afterward). No-op while nothing is focused.
  - `Escape` → close + return focus to the trigger.
  - `Tab` → close and move focus naturally.

## Known limitations

- **Single-select only.** Multi-select (`multiple` prop, `value: string[]`) is reserved for a future version.
- **No popover collision detection.** The popover renders below the trigger in the chosen `align` direction. If it would overflow the viewport, the consumer is responsible for changing `align` or placing the trigger differently. A Floating UI integration is out of scope for v1.
- **No virtualization.** Lists with hundreds of items will render every row to the DOM.
- **No `radio` content type yet.** The Figma defines a radio row but cypress-design does not ship a Radio component. Once a shared Radio lands, `SelectItem` will gain a `'radio'` variant.
- **No built-in Avatar.** `type: 'user'` rows render whatever you pass via `iconLeft`. Pass an Icon component for a consistent look.
- **Vue has no `defaultValue` prop.** React's `defaultValue` seeds uncontrolled state without engaging controlled mode; Vue's `modelValue` doubles as both the initial value AND the controlled signal, so an initial non-`undefined` `modelValue` permanently latches the component into controlled mode. Vue consumers wanting "uncontrolled with an initial value" must bridge via a local ref (`const v = ref('alpha')` + `v-model="v"`). A dedicated `defaultValue` shim on the Vue side is planned once the sticky-controlled latch can be split cleanly from the initial-seed path.

## References

- Light mode Figma: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5020-18440
- Dark mode Figma: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5116-122756
- Implementation details: [`architecture.md`](./architecture.md)
