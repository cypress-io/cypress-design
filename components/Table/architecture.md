---
name: components/Table/architecture
description: 'How Table is built — file layout, shared sort and alignment logic in constants, sort state ownership, column width, truncation, and sideways scrolling, and how clickable rows work without a stretched link. Fetch alongside instructions.md when changing Table; skip when only using it.'
---

# Table — architecture

How the Table component is built. For usage, see [`instructions.md`](https://design.cypress.io/agents/components/Table/instructions.md).

## File layout

```text
components/Table/
├── instructions.md      # Consumer-facing usage doc
├── architecture.md      # This file
├── constants/src/index.ts
│                        # Types, sort/alignment/row-link logic, all class strings
├── react/Table.tsx      # React component; adds `render` to the column type
└── vue/Table.vue        # Vue component; `cell-<key>` / `header-<key>` slots
```

## Logic lives in constants

Everything both frameworks need to agree on is a plain function in `constants/src/index.ts`: which column is primary, header and cell alignment resolution, the next sort on click, the arrow direction, and `sortRows`. The framework files only hold state and markup, so a behavior change is made once.

`TableColumnBase` takes the icon type as a parameter. React narrows it to `React.ElementType` and adds `render`; Vue narrows it to `Component` and uses slots instead, since a render function in a Vue column config would fight the template.

Class strings also live in constants. The Tailwind ESLint rules only cover `components/*/react` and `components/*/vue`, and several classes here are arbitrary values (the row outline shadows copy the UI Coverage table).

The constants package is private and bundled into each framework package, so class strings and helpers can change without a breaking release. The React and Vue packages re-export the public types plus `sortRows` and `getNextSort`, so a `manualSort` page can sort exactly like the built-in sort.

## Sort state

Both frameworks treat `sort !== undefined` as controlled: a click only reports the next sort (`onSortChange` / `update:sort`) and the table shows the prop. Unbound, they keep the sort in local state, so an uncontrolled table works too. Vue's `v-model:sort` is the controlled case.

`manualSort` only skips `sortRows`; the header still shows and reports sort state.

Sort buttons show for every sortable column whatever the row count. Hiding them for one row would make the header (and `aria-sort`) change as a filter narrows the rows.

Row keys come from `rowKey`. A row missing the field gets a key generated once per row object (a `WeakMap`), so keys stay unique and move with the row when it's re-sorted.

## Column width and scrolling

The primary `<th>`/`<td>` get `w-full`, so in an auto-layout table the column takes the leftover width. A truncating primary column adds `max-w-0`, which lets it shrink below its content so the inner `truncate` element ellipsizes instead of widening the table. Other truncating columns have no leftover width to shrink into, so their content caps at `max-w-xs`. The cap goes on the content element rather than the `<td>`, because CSS leaves `max-width` on table cells undefined. Truncating text next to an icon has `min-w-0` so it can shrink inside the flex row.

Without truncation a long value widens the table, so the `<table>` sits in an `overflow-x-auto` wrapper. The wrapper has 2px padding offset by an equal negative margin, so the hovered row's outer ring isn't clipped and the table still lines up with its surroundings. The cost: the wrapper is 4px wider than its container, so a table placed edge to edge with nothing around it can make the page scroll sideways by 2px. That was chosen over insetting the table or dropping the ring's ends. The wrapper is dropped when `stickyHeader` is set: an overflow wrapper becomes the header's nearest scrolling ancestor, and since it never scrolls vertically the header would never stick. Vue sets `inheritAttrs: false` and binds `$attrs` on the `<table>`, so attributes land on the table in both frameworks.

## Clickable rows

The row link is a real link element in the primary cell, so focus, screen readers, and Cmd/Ctrl-click on the link work natively. Clicks elsewhere on the row go through `followRowLink`, which ignores clicks on interactive elements inside the row (not ancestors of the table, which may be a focusable scroll container) and text selections, opens a new tab for Cmd/Ctrl/Shift/middle-click, and otherwise calls `click()` on the link so router links run their own handler. It finds the link through a marker on the primary `<td>` (the cell's `<a href>`, or else whatever `rowLinkAs` rendered), since a `rowLinkAs` component may not pass extra attributes through to its element.

A stretched `::after` overlay on the link would be simpler, but Safari doesn't treat a `position: relative` table row as the containing block (WebKit bug 240961), so the overlay escapes the row.

The row outline is a `box-shadow` on the `<tr>`: on hover, a 1px inset border plus a 2px light ring outside the row; on keyboard focus, a 2px inset border. The row's cell dividers turn transparent while it shows (cells paint over the row's shadow). Hover uses `:hover`; keyboard focus uses `:has(:focus-visible)` so a mouse click on the link doesn't leave the focus outline behind.
