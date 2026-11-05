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

// Rows missing their key field get a generated key tied to the row object, so
// keys stay unique and follow the row when it's reordered. Primitive rows
// can't be WeakMap keys, so they key by their own value.
const generatedRowKeys = new WeakMap<object, string>()
let nextGeneratedRowKey = 0

export function getRowKey<Row>(row: Row, rowKey: TableRowKey<Row>): string {
  if (typeof rowKey === 'function') return rowKey(row)
  const value = (row as Record<string, unknown>)[rowKey]
  if (value !== undefined && value !== null) return String(value)
  if (typeof row !== 'object' || row === null) return String(row)
  let key = generatedRowKeys.get(row)
  if (key === undefined) {
    key = `table-row-${nextGeneratedRowKey++}`
    generatedRowKeys.set(row, key)
  }
  return key
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

// Marks the primary cell of a clickable row. The cell, not the link, carries
// the marker because a `rowLinkAs` component may not pass extra attributes
// through to the element it renders.
const RowLinkCellAttribute = 'data-table-row-link-cell'
export const RowLinkCellAttributes = { [RowLinkCellAttribute]: '' } as const

const InteractiveSelector =
  'a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'

// A click anywhere on a clickable row follows its link. The link is a real
// `<a>` in the primary cell so keyboard, screen reader, and Cmd/Ctrl-click on
// the link itself work natively; this covers the rest of the row. The link is
// the cell's `<a href>`, or else whatever `rowLinkAs` rendered. A stretched
// `::after` overlay would be simpler, but Safari doesn't position against a
// `position: relative` table row (WebKit bug 240961).
export function followRowLink(event: MouseEvent, row: HTMLElement): void {
  if (event.defaultPrevented) return
  if (event.button !== 0 && event.button !== 1) return
  // Only interactive elements inside the row count; the table itself may sit
  // in a focusable scroll container or a `<label>`.
  const interactive = (event.target as Element | null)?.closest(
    InteractiveSelector,
  )
  if (interactive && row.contains(interactive)) return
  // A click that ends a text selection inside the row selects, not navigates.
  // A selection elsewhere on the page doesn't block the row.
  const selection = window.getSelection()
  if (
    selection?.toString() &&
    selection.anchorNode &&
    row.contains(selection.anchorNode)
  )
    return
  const cell = row.querySelector(`[${RowLinkCellAttribute}]`)
  const link =
    cell?.querySelector<HTMLAnchorElement>('a[href]') ??
    (cell?.firstElementChild as HTMLElement | null | undefined)
  if (!link) return
  const newTab =
    event.button === 1 || event.metaKey || event.ctrlKey || event.shiftKey
  if (newTab && link instanceof HTMLAnchorElement) {
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
// ellipsizes instead of widening the table.
export const CssTruncatePrimaryCellClasses = 'max-w-0'

export function getColumnWidthClasses<Row>(
  column: TableColumnBase<Row>,
  isPrimary: boolean,
): string {
  if (!isPrimary) return ''
  return column.truncate
    ? `${CssPrimaryCellClasses} ${CssTruncatePrimaryCellClasses}`
    : CssPrimaryCellClasses
}

// Other truncating columns have no leftover width to give, so their content
// caps at a fixed width. The cap sits on the content, not the `<td>`, because
// `max-width` on table cells is undefined in CSS.
export const CssContentWidthClasses = {
  fit: 'max-w-full',
  capped: 'max-w-xs',
} as const

export function getCellContentWidthClasses<Row>(
  column: TableColumnBase<Row>,
  isPrimary: boolean,
): string {
  return column.truncate && !isPrimary
    ? CssContentWidthClasses.capped
    : CssContentWidthClasses.fit
}

// Without truncation a long value widens its column, so the table scrolls
// sideways inside this wrapper. Its padding, offset by an equal negative
// margin, leaves room for the hovered row's outer ring, which the overflow
// would otherwise clip. A sticky header needs the consumer's scroll container
// instead: an `overflow` wrapper here would become the header's sticky
// ancestor and it would never stick.
export const CssScrollContainerClasses = '-m-0.5 overflow-x-auto p-0.5'

// Icon + text, used by headers and by cells with a `cellIcon`.
export const CssIconContentClasses =
  'inline-flex items-center gap-2 align-middle'

export const CssIconClasses = 'shrink-0'

export const IconStrokeColor = 'gray-500'

export const IconFillColor = 'gray-50'

export const CssSortButtonClasses =
  'group/sort inline-flex max-w-full items-center gap-2 rounded text-gray-900 hover:text-indigo-500 focus-visible:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'

export const CssSortIndicatorClasses =
  'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white'

export const CssSortIndicatorHiddenClasses =
  'invisible group-hover/sort:visible group-focus-visible/sort:visible'

export const SortArrowStrokeColor = 'indigo-500'

export const CssBodyCellClasses =
  'whitespace-nowrap border-b border-gray-50 py-3 pl-4'

// The sort indicator takes its space even while hidden, so a right- or
// center-aligned sortable header's label sits 28px (indicator + gap) further
// from the end edge. Cells aligned the same way as that header get the same
// extra end padding so their values line up with the label.
export const CssBodyCellPaddingEndClasses = {
  default: 'pr-4',
  sortable: 'pr-11',
} as const

export function getBodyCellPaddingEnd<Row>(
  column: TableColumnBase<Row>,
  cellAlign: TableAlign,
): string {
  const headerAlign = getHeaderAlign(column)
  return column.sortable && headerAlign !== 'left' && cellAlign === headerAlign
    ? CssBodyCellPaddingEndClasses.sortable
    : CssBodyCellPaddingEndClasses.default
}

// `min-w-0` lets the text shrink when it sits next to an icon in a flex row.
export const CssTruncateClasses = 'block min-w-0 truncate'

export const CssLabelClasses = 'min-w-0 truncate'

// Cells paint over the row's shadow, so their divider is hidden while the
// outline shows, or it would draw over the outline's bottom edge. The focus
// outline tracks the row link only (inside the marked primary cell), so a
// focused control in another cell keeps its own ring without outlining the row.
export const CssClickableRowClasses =
  'group/row cursor-pointer rounded hover:shadow-[inset_0_0_0_1px_theme(colors.gray.200),0_0_0_2px_theme(colors.gray.50)] has-[[data-table-row-link-cell]_:focus-visible]:shadow-[inset_0_0_0_2px_theme(colors.gray.600)]'

export const CssClickableRowCellClasses =
  'group-hover/row:border-transparent group-has-[[data-table-row-link-cell]_:focus-visible]/row:border-transparent'

export const CssRowLinkClasses =
  'block text-indigo-500 no-underline focus-visible:outline-none'
