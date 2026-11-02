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

## Sort state

Both frameworks keep a local copy of the sort so an uncontrolled table works. React treats `sort !== undefined` as controlled and never writes local state then. Vue always writes the local ref and emits `update:sort`; a `watch` on the prop resyncs it, so `v-model:sort` and an unbound table both work.

`manualSort` only skips `sortRows`; the header still shows and reports sort state.

Sorting is hidden below `MinRowsToSort` rows because there's nothing to reorder.

## Column width and scrolling

The primary `<th>`/`<td>` get `w-full`, so in an auto-layout table the column takes the leftover width. A truncating primary column adds `max-w-0`, which lets it shrink below its content so the inner `truncate` element ellipsizes instead of widening the table. Other truncating columns have no leftover width to shrink into, so they cap at `max-w-xs` instead.

Without truncation a long value widens the table, so the `<table>` sits in an `overflow-x-auto` wrapper. The wrapper is dropped when `stickyHeader` is set: an overflow wrapper becomes the header's nearest scrolling ancestor, and since it never scrolls vertically the header would never stick. Vue sets `inheritAttrs: false` and binds `$attrs` on the `<table>`, so attributes land on the table in both frameworks.

## Clickable rows

The row link is a real link element in the primary cell, so focus, screen readers, and Cmd/Ctrl-click on the link work natively. Clicks elsewhere on the row go through `followRowLink`, which ignores clicks on interactive descendants and text selections, opens a new tab for Cmd/Ctrl/middle-click, and otherwise calls `click()` on the link so router links run their own handler.

A stretched `::after` overlay on the link would be simpler, but Safari doesn't treat a `position: relative` table row as the containing block (WebKit bug 240961), so the overlay escapes the row.

The row outline is a `box-shadow` on the `<tr>`: on hover, a 1px inset border plus a 2px light ring outside the row; on keyboard focus, a 2px inset border. The row's cell dividers turn transparent while it shows (cells paint over the row's shadow). Hover uses `:hover`; keyboard focus uses `:has(:focus-visible)` so a mouse click on the link doesn't leave the focus outline behind.
