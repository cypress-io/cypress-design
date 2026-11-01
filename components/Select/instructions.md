---
name: components/Select/instructions
description: 'Select API — single-select dropdown with a swappable Button trigger, optional header and footer, and pluggable row types: when to use it, content guidelines, props, item shapes, events, slots, states, and accessibility. Fetch when using, reviewing, or referencing Select in a Vue or React project.'
---

# Select — usage

## What it is

A single-select dropdown. The default trigger is a [Button](https://design.cypress.io/agents/components/Button/instructions.md) showing the selected label (or `placeholder`) and a chevron; the `trigger` prop / slot replaces it. The popover shows a list of rows of several types, with an optional header (title, tabs, search) and footer.

## When to use

Use Select when the user picks **one value from a list** and that value sets state — a form field, a filter, an assignment. The selected value should be worth showing on the trigger after the popover closes ("Assignee: Jordan Lee").

Reach for it when:

- There are **5 or more options.** Fewer than that, prefer a control that keeps every option visible (radio-style rows or a segmented control) — hiding four choices behind a click costs more discoverability than it saves in space.
- **Space is constrained.** A Select trades one click for a compact footprint. If the page has room to show the options inline, showing them is usually the better UX.
- The options are **nouns, not actions.** Rows name things the user chooses between (projects, people, branches).

## When to use something else

- **Switching views** → [Tabs](https://design.cypress.io/agents/components/Tabs/instructions.md). If choosing an option changes what's on screen rather than setting a value, it's a view switch, not a selection.
- **Navigation** → [Menu](https://design.cypress.io/agents/components/Menu/instructions.md). Rows that take the user somewhere are links, not values.
- **Mostly actions** → not a Select. One `type: 'button'` row for an action tightly coupled to the list (like "+ Add new") is fine; if most rows _do_ something instead of _being_ something, you want a dropdown-menu pattern instead.
- **Free-text input with suggestions** → [Textbox](https://design.cypress.io/agents/components/Textbox/instructions.md). Select's search filters a closed list; it does not accept values outside `items`.
- **Choosing several values** → not Select. It holds one value; `type: 'checkbox'` rows toggle that single value, not a set.

## Content guidelines

- Keep labels **short, parallel, and front-loaded** — put the differentiating word first ("Staging — us-east", not "The us-east staging environment"). Labels truncate rather than wrap.
- **Order for the user, not the data.** Recency or frequency beats alphabetical when a "Recent" group exists; alphabetical beats insertion order everywhere else.
- Add `searchable` past roughly **10–15 items**; add `headline` groups when the categories mean something to the user, not just to the schema.
- Keep a `disabled` row visible only when seeing it helps ("Epsilon — upgrade to enable"). If the reason it's unavailable doesn't matter to the user, omit the row.
- Give the trigger a `placeholder`. With no selection and no placeholder the trigger renders icon-only and its name falls back to "Open dropdown" — set `triggerAriaLabel` in that case.

## Exports

Both packages export `Select` (also the default export), `SelectOptionList`, and `SelectOptionItem`. The two sub-components render the panel and a single row without a trigger, for inline showcases or a custom popover shell.

Both re-export the item and enum types (`SelectItem`, `SelectItemDefault`, …, `SelectTheme`, `SelectSize`, `SelectAlignment`, `SelectHeaderTab`). React only: also `SelectProps`, `SelectTriggerContext`, `SelectOptionListProps`, and `SelectOptionItemProps`. The Vue package exports no props types. Install commands are in each framework's `ReadMe.md`.

## Props

Only `items` is required. Vue takes the same props in kebab-case, binds the value with `v-model` and the open state with `v-model:open`.

### Selection & data

- **`items`** — `SelectItem[]`, **required**. See [Items](#items).
- **`value`** — `string`. Controlled selected value, matched against each item's `value`. In Vue it takes precedence over `modelValue`; most Vue callers use `v-model` instead.
- **`defaultValue`** — `string`. React only. Initial value for an uncontrolled Select.
- **`modelValue`** — `string`. Vue only, bound with `v-model`.
- **`placeholder`** — `string`. Trigger text when nothing is selected.

Once `value` (or Vue `modelValue`) has been defined, the Select stays controlled for the rest of its life: setting it back to `undefined` shows the placeholder instead of reverting to internal state. Vue has no `defaultValue`; to seed a value, bind `v-model` to a local ref (`const v = ref('alpha')`, `v-model="v"`).

### Appearance

- **`theme`** — `'light' | 'dark'`, default `'light'`. Styles the popover (panel, rows, header, footer). It does **not** reach the default trigger: on a dark surface, also set `triggerVariant` (the docs demo uses `'outline-dark'`).
- **`size`** — `'32' | '40'`, default `'32'`. Height of the default trigger and minimum height of each row.
- **`triggerVariant`** — Button variant, default `'outline-gray-light'`. Forwarded to the default trigger with `size`. See [Button](https://design.cypress.io/agents/components/Button/instructions.md) for variants.
- **`align`** — `'left' | 'right'`, default `'left'`. Which trigger edge the popover lines up with.
- **`disabled`** — `boolean`, default `false`. Disables the default trigger, blocks opening (including the custom trigger's `toggle`), and closes an open popover.

### Dropdown sizing

These apply to the popover panel only — the trigger keeps its natural width. Accept any CSS length string (e.g. `'320px'`, `'20rem'`, `'100%'`) or a plain number (interpreted as pixels). Omit for natural sizing.

- **`width`** — fixed width of the popover.
- **`minWidth`** — minimum width.
- **`maxWidth`** — maximum width.
- **`height`** — fixed height. Usually you only need `maxHeight`.
- **`maxHeight`** — maximum height. When the rows exceed it, the items area scrolls; header and footer stay pinned.

The popover always opens below the trigger with no viewport collision handling. If it would overflow, change `align` or place the trigger differently. Every row renders to the DOM (no virtualization).

### Open state

- **`defaultOpen`** — `boolean`, default `false`. Initial open state when uncontrolled.
- **`open`** — `boolean`. Controlled open state. Pair with `onOpenChange` (React) or `v-model:open` (Vue).

### Header

Rendered above the items when any header prop is set. It has a title row (back button · `headerIconLeft` · `headerTitle` · `headerTag` · `headerIconRight`) and, below it, a tabs-and-search row when `headerTabs` or `searchable` is set.

- **`headerTitle`** — `string`. Title text; also becomes the listbox's accessible name.
- **`headerButton`** — `{ iconLeft, onClick, ariaLabel }`, all required. Icon-only back button on the left of the title row; `ariaLabel` is its accessible name.
- **`headerIconLeft`** / **`headerIconRight`** — icon component. 16px icons beside the title / at the far right.
- **`headerTag`** — `string`. Small gray [Tag](https://design.cypress.io/agents/components/Tag/instructions.md) after the title.
- **`headerTabs`** — `SelectHeaderTab[]`. Renders a [Tabs](https://design.cypress.io/agents/components/Tabs/instructions.md) row. Controlled: pass `headerActiveTab` (the active tab `id`) and update it from the tab-change event. Select doesn't swap `items` for you — change them in the handler.
- **`searchable`** — `boolean`, default `false`. Renders a search Textbox that takes focus when the popover opens. Its accessible name is `searchPlaceholder`.
- **`searchPlaceholder`** — `string`, default `'Search'`.
- **`searchFilters`** — `boolean`, default `true`. Filters rows by case-insensitive substring match on `label`. Set `false` to keep the search box without filtering. Filtering keeps `headline`, `divider`, `button`, and label-less `custom` rows, drops headlines whose group has no matching option, and shows "No results" when no selectable row matches.
- **`searchAutoFocus`** — `boolean`, default `true`. `SelectOptionList` only (not a `Select` prop). Set `false` when rendering the list inline so it doesn't take focus on page load.

### Footer

Rendered below the items when any footer prop (or the Vue `#footer` slot) is set.

- **`footerLabel`** — `string`. Left-aligned label with an info icon.
- **`footerAction`** — `{ label, onClick }`. Right-aligned Button.
- **`footer`** — `ReactNode`. React only; Vue uses the `#footer` slot. Replaces `footerLabel` and `footerAction`.

### Trigger

- **`trigger`** — React only: `ReactNode | (ctx: SelectTriggerContext) => ReactNode`. Vue uses the `#trigger` slot. Replaces the default Button; see [Custom trigger](#custom-trigger).
- **`triggerAriaLabel`** — `string`. Accessible name for the default trigger. Replaces the default name (the selected label or placeholder, or "Open dropdown" when icon-only).
- **`triggerClassName`** — `string`. Extra classes on the default trigger Button.

`triggerVariant`, `triggerAriaLabel`, and `triggerClassName` are ignored when a custom trigger is supplied.

### Ids and classes

- **`id`** — `string`. Prefix for the internal ids: popover `<id>-popover`, listbox `<id>-popover-listbox`, rows `<id>-opt-<index>`. A unique prefix is generated when omitted. It is not placed on the trigger, so a `<label for>` can't target it.
- **`className`** — React only. Classes on the outer wrapper `<div>`. In Vue, `class` and other attributes fall through to the same wrapper.
- **`popoverClassName`** (React) / **`popoverClass`** (Vue) — classes on the popover panel.

## Items

`items` is the `SelectItem` discriminated union in `components/Select/constants/src/index.ts` (re-exported from both packages); the `type` field picks the row. Read the types there for field names. Behavior the types don't spell out:

- **`default`** (`type` omitted or `'default'`) — selectable. `iconLeft` / `iconRight` take state-aware coloring; `slotRight` is unstyled trailing content; `tag` is a string rendered as a small gray Tag.
- **`headline`** / **`divider`** — structural, never selectable or keyboard-reachable.
- **`checkbox`** — selectable, with a decorative checkbox mirroring the selection. Clicking the already-selected row clears the selection: the value is emitted as `undefined` through `onChange` / `update:modelValue`. The popover stays open after a checkbox row is picked.
- **`user`** — selectable two-line row (`label` + `secondary`). The avatar is whatever icon you pass as `iconLeft` (24px); there is no built-in Avatar.
- **`button`** — an action, not a value. Reachable with the arrow keys; Enter, Space, or a click calls `onClick` and leaves the popover open (close it yourself via the controlled `open` prop if needed). Its Button size follows the panel (`'24'` at `size='32'`, `'32'` at `size='40'`); `variant` defaults to `white` on light and `outline-dark` on dark.
- **`custom`** — `render({ selected })` fills the row; Select keeps the row chrome. With a `value` it's selectable, without one it's a non-interactive row. Give it a `label` if the default trigger should show text when it's selected.
- `disabled: true` on `default`, `checkbox`, and `user` rows keeps them visible but unselectable and skipped by the arrow keys.
- `key` (required on `button`, optional on `headline`, `divider`, `custom`) is the row's render key; rows without one use their `value`.

## Events

| Vue                 | React               | Payload                              | When                                                                               |
| ------------------- | ------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `update:modelValue` | —                   | `string \| undefined`                | Selection changed. `undefined` when a checkbox row is toggled off                  |
| `change`            | `onChange`          | `(value: string \| undefined, item)` | Selection changed, with the item that caused it                                    |
| `update:open`       | `onOpenChange`      | `boolean`                            | Popover opened or closed, controlled or not. Controlled callers must update `open` |
| `header-tab-change` | `onHeaderTabChange` | `id: string`                         | A header tab was chosen                                                            |

## Slots (Vue only)

- **`#trigger="{ open, selected, toggle, close }"`** — replaces the default Button. See [Custom trigger](#custom-trigger).
- **`#footer`** — footer content; replaces `footerLabel` / `footerAction`.

## Custom trigger

The React `trigger` render function and the Vue `#trigger` slot receive `{ open, selected, toggle, close }`. Wire `toggle` (or `close`) to your element yourself.

Select adds **no** attributes to a custom trigger — no role, accessible name, `aria-expanded`, `aria-controls`, or `aria-activedescendant`. Add them yourself: use a real `<button>`, give it a name, bind `aria-expanded` to `open`, and point `aria-controls` at `<id>-popover-listbox` (pass `id` so you know it). The wrapper's keyboard handling (open, arrows, Enter/Space, Escape, Tab) still applies to keys pressed inside it.

## States

Rows:

- **hover** / **active** — pointer over / pressed.
- **selected** — the row's `value` matches the selection (`data-selected`, `aria-selected`).
- **focused** — the row the arrow keys landed on (`data-focused="true"`). Rows never take DOM focus, so this comes only from the arrow keys, never from Tab or a click.
- **disabled** — `aria-disabled="true"`; suppresses the hover and focused visuals.

The default trigger has Button's states; its chevron rotates 180° while the popover is open.

## Accessibility

- The default trigger is a `<button type="button">` with `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls` pointing at the listbox. Its accessible name comes from `aria-label` (see `triggerAriaLabel`), not from the button text.
- Only the rows container has `role="listbox"`, so header buttons, tabs, search, and footer actions aren't treated as listbox children. Its `aria-label` is `headerTitle`, or "Options" when unset.
- Selectable rows are `role="option"` with `aria-selected`. On `button` rows the inner Button carries `role="option"` and `tabindex="-1"`; the wrapper is `role="presentation"`. `headline` rows are `role="presentation"`; `divider` rows also have `aria-hidden="true"`. Disabled rows are `<div>`s with `aria-disabled="true"`. The checkbox in `checkbox` rows is `aria-hidden`.
- `aria-activedescendant` sits only on the element with DOM focus: the trigger when `searchable` is off, the search Textbox when it's on. It is set only after an arrow key lands on a row.
- Keyboard, with focus on the trigger or search box:
  - Closed: `Enter`, `Space`, or `ArrowDown` opens with no row focused.
  - `ArrowDown` / `ArrowUp`: the first press lands on the first / last interactive row; later presses move and wrap. Headlines, dividers, and disabled rows are skipped; `button` rows are included.
  - `Enter` or `Space` on a focused row selects it (or runs a `button` row's `onClick`). In the search box, `Space` types a space and only `Enter` commits. With no row focused, both do nothing — they don't close the popover.
  - Selecting a non-checkbox row, or pressing `Escape`, closes the popover and returns focus to the trigger. `Tab` closes it and lets focus move on. Clicking the trigger toggles the popover; a mouse press outside the Select closes it.
- Select has no type-ahead and no `Home` / `End` handling. Consumers must name an icon-only trigger, give `headerButton` an `ariaLabel`, and wire ARIA on any custom trigger.

Implementation notes: [architecture.md](https://design.cypress.io/agents/components/Select/architecture.md).
