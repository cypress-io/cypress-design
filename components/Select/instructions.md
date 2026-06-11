# Select — usage

How to use the Select component. Anything documented here is supported; anything missing isn't.

## What it is

A single-select dropdown. The trigger is a [`Button`](../Button/instructions.md) by default (showing the selected label followed by a chevron icon), but can be swapped for any other element via the `trigger` slot. The popover panel ("Option List") shows a list of rows ("Option Items") of several content types, with optional header (title, tabs, search) and footer.

Select composes existing cypress-design primitives — Button, Tabs, Checkbox, Textbox (for the search input), Tag, Icon — so consumers get a consistent look without taking a dependency on `react-select` or other third-party dropdown libraries.

## Install

```bash
yarn add @cypress-design/vue-select         # Vue
yarn add @cypress-design/react-select       # React
yarn add @cypress-design/constants-select   # shared types (SelectItem, etc.)
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
- **`onChange`** — `(value: string, item: SelectItem) => void` (React). Vue uses `@update:modelValue`.
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

The header is rendered above the items when at least one header prop is set.

- **`headerTitle`** — `string`. Section heading at the top of the popover.
- **`headerTabs`** — `Tab[]`. Renders a [`Tabs`](../Tabs/instructions.md) row inside the header. Use with `headerActiveTab` and `onHeaderTabChange`.
- **`headerActiveTab`** — `string`. ID of the currently active tab. Controlled.
- **`onHeaderTabChange`** — `(id: string) => void`. Fired when the user switches tabs.
- **`searchable`** — `boolean`, default `false`. Renders a search [`Textbox`](../Textbox/instructions.md) in the header. The current input value filters `items` by case-insensitive substring match against each item's `label`.
- **`searchPlaceholder`** — `string`, default `'Search'`. Placeholder for the search Textbox.

### Footer

The footer is rendered below the items when at least one footer prop is set.

- **`footer`** — `ReactNode | string` (React) / slot `#footer` (Vue). Arbitrary footer content. Takes precedence over the shorthand props below.
- **`footerLabel`** — `string`. Shorthand: shows a left-aligned label inside the footer row.
- **`footerAction`** — `{ label: string; onClick: () => void }`. Shorthand: shows a right-aligned action button using cypress-design's Button.

### Trigger

- **`trigger`** — `ReactNode | ((ctx) => ReactNode)` (React) / slot `#trigger="{ ctx }"` (Vue). Escape hatch to replace the default Textbox trigger. The render context (`ctx`) exposes `{ open: boolean, selected: SelectItem | null, toggle: () => void, close: () => void }`. The consumer is responsible for calling `toggle()` or `close()` on whatever element they render; Select still owns the popover.

### Extension

- **`className`** — applied to the outer wrapper element.
- **`popoverClassName`** — applied to the popover panel.

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
  iconLeft?: IconNode // any Icon component or React/Vue node
  slotRight?: ReactNode // right-side slot: icon, button, switch, etc.
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

### `checkbox` (selectable, single-select)

Visual affordance only — the row shows a Checkbox that mirrors the row's selected state. Clicking the row sets it as the selected value (Select remains single-select; the checkbox does not toggle independently).

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
  variant?: ButtonVariant // forwarded to <Button>
}
```

### `custom` (escape hatch)

Full control over the row's interior. Useful for shapes the built-in types don't cover. Provide a `value` to make the row selectable; omit it for a non-selectable row.

```ts
interface CustomItem {
  type: 'custom'
  value?: string
  render: (ctx: { selected: boolean }) => ReactNode
}
```

## Events

| Event                  | Payload                 | Description                                       |
| ---------------------- | ----------------------- | ------------------------------------------------- |
| `update:modelValue`    | `string`                | Vue — emitted whenever the selection changes      |
| `update:open`          | `boolean`               | Vue — emitted whenever the popover opens / closes |
| `change`               | `string, SelectItem`    | Vue — emitted whenever the selection changes      |
| `onChange` (React)     | `(value, item) => void` | Selection changed                                 |
| `onOpenChange` (React) | `(open) => void`        | Popover open state changed                        |

## Slots (Vue only)

- **`#trigger="{ open, selected, toggle, close }"`** — replace the default Textbox trigger.
- **`#footer`** — arbitrary footer content (takes precedence over `footerLabel` / `footerAction`).
- **`#header-extra`** — additional content rendered inside the header below the title / tabs / search (rare).

## States

The Option Item responds to the following states (all visible in the Figma):

- `default` — base.
- `hover` — mouse over the row.
- `active` — mouse pressed on the row.
- `selected` — row's `value` matches the current selection.
- `focus-visible` — row received focus via keyboard (Tab or Arrow keys).
- `disabled` — `item.disabled === true`. Overrides hover/active visuals.

State priority: `disabled` > `focus-visible` > `active` > `hover` > `selected` > `default`.

The Trigger inherits Textbox's states (`default`, `hover`, `focused`, `focus-visible`, `disabled`) and adds an open-popover state that mirrors `focus-within`.

## Sizes

The Figma defines sizes `32` and `40` for the Option Item. Select forwards the same `size` to its trigger, so the trigger and rows always match. `48` is accepted as a passthrough to Textbox for the trigger but the rows render at `40` in that case (the Figma does not specify a `48` row).

## Accessibility

- Trigger has `role="combobox"`, `aria-expanded`, `aria-controls` (pointing at the popover), `aria-haspopup="listbox"`.
- Popover has `role="listbox"`.
- Selectable rows have `role="option"` + `aria-selected`. Non-selectable rows (`headline`, `divider`, `button`) have `role="presentation"`.
- Disabled rows have `aria-disabled="true"` (they are `<div>` elements, not `<button>` / `<input>`, so the HTML `disabled` attribute does not apply).
- Focus inside the popover is tracked via `aria-activedescendant` on the trigger so the search Textbox keeps real DOM focus while ArrowUp / ArrowDown traverse the options.
- Keyboard support:
  - `Enter` / `Space` on the trigger → toggle open.
  - `ArrowDown` on the trigger → open (does not focus a row yet; the next arrow keypress lands focus — see below).
  - Open with no row focused. The first `ArrowDown` lands focus on the first selectable row; the first `ArrowUp` lands focus on the last. Subsequent `ArrowUp` / `ArrowDown` walk previous / next selectable rows (skipping `headline`, `divider`, `button`, and `disabled`).
  - `Enter` on a focused row → select + close (selectable rows); fire `onClick` (`button` rows). No-op while nothing is focused.
  - `Escape` → close + return focus to the trigger.
  - `Tab` → close and move focus naturally.

## Known limitations

- **Single-select only.** Multi-select (`multiple` prop, `value: string[]`) is reserved for a future version.
- **No popover collision detection.** The popover renders below the trigger in the chosen `align` direction. If it would overflow the viewport, the consumer is responsible for changing `align` or placing the trigger differently. A Floating UI integration is out of scope for v1.
- **No virtualization.** Lists with hundreds of items will render every row to the DOM.
- **No `radio` content type yet.** The Figma defines a radio row but cypress-design does not ship a Radio component. Once a shared Radio lands, `SelectItem` will gain a `'radio'` variant.
- **No built-in Avatar.** `type: 'user'` rows render whatever you pass via `iconLeft`. Pass an Icon component for a consistent look.

## References

- [Live demo](./ReadMe.md) renders on the design system site.
- Light mode Figma: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5020-18440
- Dark mode Figma: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5116-122756
- Implementation details: [`architecture.md`](./architecture.md)
