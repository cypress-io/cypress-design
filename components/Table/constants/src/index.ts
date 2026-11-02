export type TableAlign = 'left' | 'center' | 'right'
export type TableSortDirection = 'ascending' | 'descending'

export interface TableSort {
  key: string
  direction: TableSortDirection
}

type SortScalar = string | number | null | undefined
export type TableSortValue = SortScalar | SortScalar[]

// `Icon` stays loose so React and Vue icon components both fit; each framework
// renders it with its own dynamic-component mechanism.
export interface TableColumnBase<Row, Icon = unknown> {
  key: string
  label: string
  icon?: Icon
  align?: TableAlign
  headerAlign?: TableAlign
  cellAlign?: TableAlign | ((row: Row) => TableAlign)
  sortable?: boolean
  sortValue?: (row: Row) => TableSortValue
  firstSortDirection?: TableSortDirection
  primary?: boolean
  truncate?: boolean
  // A function rather than a component, so React function components can't be
  // mistaken for a per-row resolver.
  cellIcon?: (row: Row) => Icon | undefined
}

export type TableRowKey<Row> = string | ((row: Row) => string)

export const DefaultAlign: TableAlign = 'left'
export const DefaultFirstSortDirection: TableSortDirection = 'ascending'

// Sorting with one row has nothing to reorder, so headers render as plain text.
export const MinRowsToSort = 2

export function getCellValue<Row>(
  row: Row,
  column: TableColumnBase<Row>,
): unknown {
  return (row as Record<string, unknown>)[column.key]
}

export function getHeaderAlign<Row>(column: TableColumnBase<Row>): TableAlign {
  return column.headerAlign ?? column.align ?? DefaultAlign
}

export function getCellAlign<Row>(
  column: TableColumnBase<Row>,
  row: Row,
): TableAlign {
  const { cellAlign } = column
  if (typeof cellAlign === 'function') return cellAlign(row)
  return cellAlign ?? column.align ?? DefaultAlign
}

export function getPrimaryColumnKey<Row>(
  columns: TableColumnBase<Row>[],
): string | undefined {
  return (columns.find((column) => column.primary) ?? columns[0])?.key
}

export function getRowKey<Row>(row: Row, rowKey: TableRowKey<Row>): string {
  if (typeof rowKey === 'function') return rowKey(row)
  return String((row as Record<string, unknown>)[rowKey])
}

export function getNextSort<Row>(
  column: TableColumnBase<Row>,
  current: TableSort | null | undefined,
): TableSort {
  if (current?.key === column.key) {
    return {
      key: column.key,
      direction: current.direction === 'ascending' ? 'descending' : 'ascending',
    }
  }
  return {
    key: column.key,
    direction: column.firstSortDirection ?? DefaultFirstSortDirection,
  }
}

// The arrow shows the current direction on the sorted column, and the
// direction a click would apply on every other column.
export function getArrowDirection<Row>(
  column: TableColumnBase<Row>,
  current: TableSort | null | undefined,
): TableSortDirection {
  if (current?.key === column.key) return current.direction
  return column.firstSortDirection ?? DefaultFirstSortDirection
}

const collator = new Intl.Collator(undefined, { numeric: true })

function isEmpty(value: SortScalar): value is null | undefined {
  return value === null || value === undefined
}

// Empty values sort last whatever the direction, so `direction` is applied
// here rather than by negating the result.
function compareScalars(
  a: SortScalar,
  b: SortScalar,
  direction: TableSortDirection,
): number {
  if (isEmpty(a) || isEmpty(b)) {
    if (isEmpty(a) && isEmpty(b)) return 0
    return isEmpty(a) ? 1 : -1
  }
  const order =
    typeof a === 'number' && typeof b === 'number'
      ? a - b
      : collator.compare(String(a), String(b))
  return direction === 'ascending' ? order : -order
}

function compareSortValues(
  a: TableSortValue,
  b: TableSortValue,
  direction: TableSortDirection,
): number {
  const aList = Array.isArray(a) ? a : [a]
  const bList = Array.isArray(b) ? b : [b]
  const length = Math.max(aList.length, bList.length)
  for (let i = 0; i < length; i++) {
    const result = compareScalars(aList[i], bList[i], direction)
    if (result !== 0) return result
  }
  return 0
}

export function sortRows<Row>(
  rows: Row[],
  columns: TableColumnBase<Row>[],
  sort: TableSort | null | undefined,
): Row[] {
  const column = sort && columns.find(({ key }) => key === sort.key)
  if (!sort || !column) return rows
  const getValue =
    column.sortValue ?? ((row: Row) => getCellValue(row, column) as SortScalar)
  // Array.prototype.sort is stable, so ties keep their order from `rows`.
  return [...rows].sort((a, b) =>
    compareSortValues(getValue(a), getValue(b), sort.direction),
  )
}

const RowLinkAttribute = 'data-table-row-link'
export const RowLinkAttributes = { [RowLinkAttribute]: '' } as const

const InteractiveSelector =
  'a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'

// A click anywhere on a clickable row follows its link. The link is a real
// `<a>` in the primary cell so keyboard, screen reader, and Cmd/Ctrl-click on
// the link itself work natively; this covers the rest of the row. A stretched
// `::after` overlay would be simpler, but Safari doesn't position against a
// `position: relative` table row (WebKit bug 240961).
export function followRowLink(event: MouseEvent, row: HTMLElement): void {
  if (event.defaultPrevented) return
  if (event.button !== 0 && event.button !== 1) return
  const target = event.target as Element | null
  if (target?.closest(InteractiveSelector)) return
  if (window.getSelection()?.toString()) return
  const link = row.querySelector<HTMLAnchorElement>(`[${RowLinkAttribute}]`)
  if (!link) return
  const newTab = event.button === 1 || event.metaKey || event.ctrlKey
  if (newTab && link.href) {
    window.open(link.href, '_blank', 'noopener')
    return
  }
  link.click()
}

export const CssTableClasses =
  'w-full border-separate border-spacing-0 bg-white text-left text-base text-gray-900'

export const CssAlignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const satisfies Record<TableAlign, string>

export const CssHeaderCellClasses =
  'whitespace-nowrap border-b border-gray-100 bg-white px-4 py-3 font-medium'

export const CssStickyHeaderCellClasses = 'sticky top-0 z-10'

export const CssPrimaryCellClasses = 'w-full'

// `max-w-0` lets the full-width primary column shrink below its content so it
// ellipsizes instead of widening the table. Other columns have no leftover
// width to give, so they cap at a fixed width instead.
export const CssTruncateCellClasses = {
  primary: 'max-w-0',
  other: 'max-w-xs',
} as const

export function getColumnWidthClasses<Row>(
  column: TableColumnBase<Row>,
  isPrimary: boolean,
): string {
  const classes: string[] = []
  if (isPrimary) classes.push(CssPrimaryCellClasses)
  if (column.truncate) {
    classes.push(
      isPrimary ? CssTruncateCellClasses.primary : CssTruncateCellClasses.other,
    )
  }
  return classes.join(' ')
}

// Without truncation a long value widens its column, so the table scrolls
// sideways inside this wrapper. A sticky header needs the consumer's scroll
// container instead: an `overflow` wrapper here would become the header's
// sticky ancestor and it would never stick.
export const CssScrollContainerClasses = 'overflow-x-auto'

export const CssHeaderContentClasses =
  'inline-flex max-w-full items-center gap-2 align-middle'

export const CssIconClasses = 'shrink-0'

export const IconStrokeColor = 'gray-500'

export const IconFillColor = 'gray-50'

export const CssCellIconContentClasses =
  'inline-flex max-w-full items-center gap-2 align-middle'

export const CssSortButtonClasses =
  'group/sort inline-flex max-w-full items-center gap-2 rounded text-gray-900 hover:text-indigo-500 focus-visible:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'

export const CssSortIndicatorClasses =
  'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white'

export const CssSortIndicatorHiddenClasses =
  'invisible group-hover/sort:visible group-focus-visible/sort:visible'

export const SortArrowStrokeColor = 'indigo-500'

export const CssBodyCellClasses =
  'whitespace-nowrap border-b border-gray-50 py-3 pl-4'

// The sort indicator takes its space even while hidden, so a sortable
// header's label ends 28px (indicator + gap) before the cell edge. Right- and
// center-aligned cells in that column get the same extra end padding so their
// values line up with the label.
export const CssBodyCellPaddingEndClasses = {
  default: 'pr-4',
  sortable: 'pr-11',
} as const

export function getBodyCellPaddingEnd<Row>(
  column: TableColumnBase<Row>,
  align: TableAlign,
  canSort: boolean,
): string {
  return column.sortable && canSort && align !== 'left'
    ? CssBodyCellPaddingEndClasses.sortable
    : CssBodyCellPaddingEndClasses.default
}

export const CssTruncateClasses = 'block truncate'

// Cells paint over the row's shadow, so their divider is hidden while the
// outline shows, or it would draw over the outline's bottom edge.
export const CssClickableRowClasses =
  'group/row cursor-pointer rounded hover:shadow-[inset_0_0_0_1px_theme(colors.gray.200),0_0_0_2px_theme(colors.gray.50)] has-[:focus-visible]:shadow-[inset_0_0_0_2px_theme(colors.gray.600)]'

export const CssClickableRowCellClasses =
  'group-hover/row:border-transparent group-has-[:focus-visible]/row:border-transparent'

export const CssRowLinkClasses =
  'block text-indigo-500 no-underline focus-visible:outline-none'
