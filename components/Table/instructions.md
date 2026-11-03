---
name: components/Table/instructions
description: 'Table API — data table driven by a column config: per-column header and cell icons, sort buttons, and left/center/right alignment with per-cell overrides; optional truncation, clickable rows, and a sticky header. Fetch when using, reviewing, or referencing Table in a Vue or React project.'
---

# Table — usage

## What it is

A data table built from a `columns` config and a `rows` array. Each column sets its label, an optional icon before the label, its alignment, and whether it can be sorted. Sortable headers show a round sort button with an arrow. Rows can optionally be clickable (the whole row is a link), and the header can optionally stick to the top of its scroll container.

Reference surfaces in Cypress Cloud: the UI Coverage and Accessibility views tables, and the MCP usage table (user, calls, last active).

## When to use

Use Table when the user compares **many records across the same attributes** — views by snapshots and coverage, users by calls and last activity. Every row has the same shape and the columns mean the same thing on every row.

## When to use something else

- **One record's details** → a description list or a form layout, not a two-column table.
- **Choosing a value** → [Select](https://design.cypress.io/agents/components/Select/instructions.md).
- **A list of test results** → [TestResult](https://design.cypress.io/agents/components/TestResult/instructions.md) rows.
- **Switching what the table shows** (Active users / Inactive users) → put [Tabs](https://design.cypress.io/agents/components/Tabs/instructions.md) above the table and pass a different `rows` array per tab. Table has no built-in header, tabs, or footer.

## Content guidelines

- **Left-align text, right-align numbers.** Counts, durations, and percentages read and compare best right-aligned. Center only short, fixed-width content (a status icon, a single tag).
- Put the **identifying column first** (view name, user name). It's the `primary` column: it fills the remaining width and holds the row link.
- Header labels are **short nouns in sentence case** ("Tested elements", not "Tested Elements" or "Number of tested elements").
- Give a column an `icon` only when it helps users scan for the column; don't add one to every header.
- Make a column sortable when users would plausibly rank by it. Don't make every column sortable by default.

## Packages

- React: `@cypress-design/react-table`
- Vue: `@cypress-design/vue-table`
  Both packages export `Table` (also the default export) and the types `TableColumn`, `TableSort`, `TableAlign`, `TableSortDirection`, and `TableSortValue`. React also exports `TableProps`.

## Props

Only `columns` and `rows` are required. Vue takes the same props in kebab-case.

### Data

- **`columns`** — `TableColumn[]`, **required**. See [Columns](#columns).
- **`rows`** — `Row[]`, **required**. Any objects. React types the table as `Table<Row>` from this prop.
- **`rowKey`** — `string | ((row: Row) => string)`. Default `'id'`. A unique, stable key per row. Rows missing the field get a generated key tied to the row object.

### Sorting

- **`sort`** — `TableSort | null`. The current sort. Controlled when set, including `null` for unsorted: a click only reports the new sort, and the table shows whatever `sort` the page passes back. Vue binds it with `v-model:sort`.
- **`defaultSort`** — `TableSort`. React only. Initial sort for an uncontrolled table. Vue seeds it by binding `v-model:sort` to a local ref.
- **`onSortChange`** — `(sort: TableSort) => void`. React only. Called when a sort button is clicked. Vue emits `update:sort`.
- **`manualSort`** — `boolean`. Default `false`. When `false`, Table reorders `rows` itself using each column's `sortValue`. When `true`, Table only shows the sort state and reports clicks; the page reorders `rows` (server-side sorting, or sorting persisted in the URL). Sort buttons stay visible however many rows are passed, since `rows` may be one page of a longer list.

A click on the sorted column's button flips its direction. A click on any other sortable column sorts by that column in its `firstSortDirection`. There is no unsorted state once a sort is set.

Built-in sorting is stable. It compares `sortValue` results: numbers numerically, strings with `localeCompare` (numeric collation), arrays element by element (for tie-breakers). `null` and `undefined` sort last in both directions.

### Rows

- **`rowLink`** — `(row: Row) => Record<string, unknown> | undefined`. Makes rows clickable. Returns the props for the row's link element; return `undefined` to leave that row non-clickable. See [Clickable rows](#clickable-rows).
- **`rowLinkAs`** — `string | Component`. Default `'a'`. The element or component that renders the row link, for example React Router's `Link` or Vue's `RouterLink`.

### Layout

- **`stickyHeader`** — `boolean`. Default `false`. Pins the header row to the top of the nearest scrolling ancestor while the rows scroll under it. The header gets a white background so rows don't show through. Table doesn't create the scroll container; give an ancestor a fixed height and `overflow-auto`, or let the page scroll. See [Width and scrolling](#width-and-scrolling) for how this changes sideways scrolling.

React: `className`, `aria-*`, and other `<table>` props go on the `<table>` element. Vue: `class` and other non-prop attributes fall through to the same element.

### Columns

```ts
type TableAlign = 'left' | 'center' | 'right'
type TableSortDirection = 'ascending' | 'descending'

interface TableSort {
  key: string // the sorted column's key
  direction: TableSortDirection
}

interface TableColumn<Row> {
  key: string // unique; also the default field read from each row
  label: string // header text, and the sort button's accessible name
  icon?: Component // icon before the header label (React or Vue component)
  align?: TableAlign // header and cells; default 'left'
  headerAlign?: TableAlign // header only; overrides `align`
  cellAlign?: TableAlign | ((row: Row) => TableAlign) // cells only; overrides `align` per cell
  sortable?: boolean // default false
  sortValue?: (row: Row) => string | number | null | (string | number | null)[] // default row[key]
  firstSortDirection?: TableSortDirection // direction of the first click; default 'ascending'
  primary?: boolean // identifying column; default: the first column
  truncate?: boolean // ellipsize long values; default false
  cellIcon?: (row: Row) => Component | undefined // icon before each cell's content
  render?: (row: Row) => ReactNode // React only; see "Cells" below
}
```

Use `firstSortDirection: 'descending'` for columns where the largest value is the interesting one (snapshots, calls), so the first click shows it first.

Set `primary` on at most one column. The primary column grows to fill the remaining width and holds the row link.

React: define `columns` outside the component, or wrap it in `useMemo`. A new `columns` array on every render makes Table re-sort `rows` on every render.

### Width and scrolling

Cells don't wrap. By default every value shows in full: a long value widens its column, and when the table is wider than its container it scrolls sideways.

Set `truncate: true` on a column to cut long values off with an ellipsis instead, with the full value in `title` when it's a string. The primary column truncates to fit the width left over by the other columns; any other column truncates past 320px.

With `stickyHeader`, Table doesn't add its own sideways scrolling, because a scroll wrapper inside the table would stop the header from sticking. Give the ancestor that scrolls vertically `overflow-auto` so it scrolls both ways, or truncate the long columns.

### Cells

By default a cell shows `row[column.key]` as text.

`cellIcon` puts an icon before a cell's content. It's a function of the row so each row can show a different icon, or none (return `undefined`): `cellIcon: () => IconDocumentBlank` for every row, `cellIcon: (view) => (view.isPage ? IconDocumentBlank : undefined)` for some. The icon sits inside the row link on clickable rows, and the text next to it still truncates when the column has `truncate`.

- React: set `render` on the column. It receives the row and returns the cell content.
- Vue: use the `cell-<key>` scoped slot, with `row` and `value` (the default `row[key]`) as slot props.

```tsx
const columns: TableColumn<User>[] = [
  { key: 'name', label: 'User', render: (u) => <UserCell user={u} /> },
  {
    key: 'calls',
    label: 'Calls',
    sortable: true,
    firstSortDirection: 'descending',
    render: (u) => <CallsBar value={u.calls} max={MaxCalls} />,
  },
  {
    key: 'lastActive',
    label: 'Last active',
    sortValue: (u) => u.lastActiveAt,
  },
]

;<Table
  aria-label="Usage"
  rows={users}
  defaultSort={{ key: 'calls', direction: 'descending' }}
  columns={columns}
/>
```

```vue
<Table
  v-model:sort="sort"
  aria-label="Views"
  :rows="views"
  :columns="[
    { key: 'view', label: 'Views', icon: IconDocumentBlank, sortable: true },
    {
      key: 'snapshots',
      label: 'Snapshots',
      align: 'right',
      sortable: true,
      firstSortDirection: 'descending',
    },
    {
      key: 'tested',
      label: 'Tested elements',
      align: 'right',
      sortValue: (v) => v.testedCount,
    },
    { key: 'coverage', label: 'Coverage %', align: 'right', sortable: true },
  ]"
>
  <template #cell-tested="{ row }">{{ row.testedCount }} of {{ row.totalCount }}</template>
  <template #cell-coverage="{ row }"><CoverageBar :value="row.coverage" /></template>
</Table>
```

### Headers

- Each header shows the column's `icon` (if any), then the `label`. Header and cell icons render with a `gray-500` outline and `gray-50` fill.
- A sortable header wraps the label in a sort button. The round sort button with an arrow sits after the label in every alignment. Its space is reserved even while it's hidden, so when a sortable header is right- or center-aligned, cells aligned the same way get matching extra end padding and their values line up with the label, not with the button.
- Vue: a `header-<key>` scoped slot replaces the label, with `column` as its slot prop. The icon and sort button stay in place. React has no header override.

## Sorting states

- **Sorted column:** the sort button is always visible. The arrow points up for ascending, down for descending.
- **Other sortable columns:** the sort button appears on hover and keyboard focus, showing the arrow for the column's `firstSortDirection`, the direction a click applies.
- **Hover / focus-visible:** the label turns indigo; keyboard focus adds an outline around the label and sort button.
- **Fewer than two rows:** sort buttons are hidden and headers render as plain text, since there's nothing to reorder. With `manualSort` they always show.

## Clickable rows

Rows are not clickable unless `rowLink` is set. A clickable row:

- Renders the primary cell's content inside the link element (`rowLinkAs`, given the props `rowLink` returns). A click anywhere else on the row follows that link too; Cmd/Ctrl/Shift-click or middle-click opens it in a new tab. Clicks that end a text selection don't navigate.
- Shows a rounded outline on hover, and a darker outline while its link has keyboard focus.

A row `rowLink` returns `undefined` for renders without a link and without hover or focus styles. Non-clickable tables never show a row hover state.

Interactive content inside other cells (buttons, links, inputs) keeps its own click behavior and doesn't trigger the row link.

```tsx
import { Link } from 'react-router-dom'
;<Table
  aria-label="Views"
  columns={columns}
  rows={views}
  rowLinkAs={Link}
  rowLink={(view) => (view.disabled ? undefined : { to: `/views/${view.id}` })}
/>
```

Row links navigate; there is no `onRowClick` for opening a drawer or running an action. Put a button in a cell for row actions.

## Theme

Light only. The table has a white background and isn't styled for dark surfaces.

## Accessibility

- Renders a native `<table>` with `<thead>`/`<tbody>`; headers are `<th scope="col">`.
- Give the table an accessible name with `aria-label`, or `aria-labelledby` pointing at the visible title above it (for example, the "Usage" card heading).
- Sort buttons are `<button>` elements named by the column `label`. The sorted column's `<th>` has `aria-sort="ascending"` or `"descending"`; the arrow is `aria-hidden`.
- Row links are real links: one Tab stop per clickable row, Enter follows the link. Their accessible name is the primary cell's text.
- Keyboard focus on sort buttons and row links uses `focus-visible` outlines.
- Header and cell icons are decorative (`aria-hidden`); the label or cell text carries the meaning. Don't use a cell icon as the only signal of a value.

## Known limitations

- One sort key at a time; no multi-column sort.
- No expandable rows, row selection, pagination, column resizing, or virtualization. With very long lists, page the data before passing `rows`.
- No built-in empty state. When `rows` is empty, show your own empty state in place of the table.
