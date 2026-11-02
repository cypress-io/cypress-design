import * as React from 'react'
import clsx from 'clsx'
import { IconArrowDown, IconArrowUp } from '@cypress-design/react-icon'
import {
  type TableColumnBase,
  type TableRowKey,
  type TableSort,
  CssAlignClasses,
  CssBodyCellClasses,
  CssCellIconContentClasses,
  CssClickableRowCellClasses,
  CssClickableRowClasses,
  CssHeaderCellClasses,
  CssHeaderContentClasses,
  CssIconClasses,
  CssRowLinkClasses,
  CssScrollContainerClasses,
  CssSortButtonClasses,
  CssSortIndicatorClasses,
  CssSortIndicatorHiddenClasses,
  CssStickyHeaderCellClasses,
  CssTableClasses,
  CssTruncateClasses,
  IconFillColor,
  IconStrokeColor,
  MinRowsToSort,
  RowLinkAttributes,
  SortArrowStrokeColor,
  followRowLink,
  getArrowDirection,
  getBodyCellPaddingEnd,
  getCellAlign,
  getCellValue,
  getColumnWidthClasses,
  getHeaderAlign,
  getNextSort,
  getPrimaryColumnKey,
  getRowKey,
  sortRows,
} from '@cypress-design/constants-table'

export interface TableColumn<Row>
  extends TableColumnBase<Row, React.ElementType> {
  /**
   * Renders the cell content. Defaults to `row[key]` as text.
   */
  render?: (row: Row) => React.ReactNode
}

export interface TableProps<Row>
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'rows'> {
  columns: TableColumn<Row>[]
  rows: Row[]
  /**
   * Field name or function giving each row a unique, stable key.
   * @default 'id'
   */
  rowKey?: TableRowKey<Row>
  /**
   * Current sort. The table is controlled when this is set (`null` = unsorted).
   */
  sort?: TableSort | null
  /**
   * Initial sort for an uncontrolled table.
   */
  defaultSort?: TableSort
  onSortChange?: (sort: TableSort) => void
  /**
   * Show the sort state without reordering `rows`; the page sorts them.
   * @default false
   */
  manualSort?: boolean
  /**
   * Returns the props for a row's link, or `undefined` for a non-clickable row.
   */
  rowLink?: (row: Row) => Record<string, unknown> | undefined
  /**
   * Element or component that renders row links, e.g. React Router's `Link`.
   * @default 'a'
   */
  rowLinkAs?: React.ElementType
  /**
   * Pin the header row to the top of the nearest scrolling ancestor.
   * @default false
   */
  stickyHeader?: boolean
}

export function Table<Row>({
  columns,
  rows,
  rowKey = 'id',
  sort: sortProp,
  defaultSort,
  onSortChange,
  manualSort = false,
  rowLink,
  rowLinkAs: RowLink = 'a',
  stickyHeader = false,
  className,
  ...rest
}: TableProps<Row>) {
  const [internalSort, setInternalSort] = React.useState<TableSort | null>(
    defaultSort ?? null,
  )
  const isControlled = sortProp !== undefined
  const sort = isControlled ? sortProp : internalSort

  const primaryKey = getPrimaryColumnKey(columns)
  const canSort = rows.length >= MinRowsToSort

  const displayedRows = React.useMemo(
    () => (manualSort ? rows : sortRows(rows, columns, sort)),
    [rows, columns, sort, manualSort],
  )

  const handleSort = (column: TableColumn<Row>) => {
    const next = getNextSort(column, sort)
    if (!isControlled) setInternalSort(next)
    onSortChange?.(next)
  }

  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) =>
    followRowLink(event.nativeEvent, event.currentTarget)

  return (
    <div className={clsx(!stickyHeader && CssScrollContainerClasses)}>
      <table className={clsx(CssTableClasses, className)} {...rest}>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sort?.key === column.key
              const Icon = column.icon
              const ArrowIcon =
                getArrowDirection(column, sort) === 'ascending'
                  ? IconArrowUp
                  : IconArrowDown
              const label = (
                <>
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      className={CssIconClasses}
                      strokeColor={IconStrokeColor}
                      fillColor={IconFillColor}
                    />
                  )}
                  <span className="truncate">{column.label}</span>
                </>
              )

              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={isSorted && canSort ? sort.direction : undefined}
                  className={clsx(
                    CssHeaderCellClasses,
                    CssAlignClasses[getHeaderAlign(column)],
                    stickyHeader && CssStickyHeaderCellClasses,
                    getColumnWidthClasses(column, column.key === primaryKey),
                  )}
                >
                  {column.sortable && canSort ? (
                    <button
                      type="button"
                      className={CssSortButtonClasses}
                      onClick={() => handleSort(column)}
                    >
                      {label}
                      <span
                        className={clsx(
                          CssSortIndicatorClasses,
                          !isSorted && CssSortIndicatorHiddenClasses,
                        )}
                      >
                        <ArrowIcon
                          aria-hidden="true"
                          strokeColor={SortArrowStrokeColor}
                        />
                      </span>
                    </button>
                  ) : (
                    <span className={CssHeaderContentClasses}>{label}</span>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row) => {
            const linkProps = rowLink?.(row)

            return (
              <tr
                key={getRowKey(row, rowKey)}
                className={clsx(linkProps && CssClickableRowClasses)}
                onClick={linkProps ? handleRowClick : undefined}
                onAuxClick={linkProps ? handleRowClick : undefined}
              >
                {columns.map((column) => {
                  const isPrimary = column.key === primaryKey
                  const value = getCellValue(row, column)
                  const content = column.render
                    ? column.render(row)
                    : (value as React.ReactNode)
                  const title =
                    column.truncate && typeof value === 'string'
                      ? value
                      : undefined
                  const align = getCellAlign(column, row)
                  const CellIcon = column.cellIcon?.(row)
                  const body = CellIcon ? (
                    <span className={CssCellIconContentClasses}>
                      <CellIcon
                        aria-hidden="true"
                        className={CssIconClasses}
                        strokeColor={IconStrokeColor}
                        fillColor={IconFillColor}
                      />
                      <span
                        className={
                          column.truncate ? CssTruncateClasses : undefined
                        }
                        title={title}
                      >
                        {content}
                      </span>
                    </span>
                  ) : column.truncate ? (
                    <span className={CssTruncateClasses} title={title}>
                      {content}
                    </span>
                  ) : (
                    content
                  )

                  return (
                    <td
                      key={column.key}
                      className={clsx(
                        CssBodyCellClasses,
                        CssAlignClasses[align],
                        getBodyCellPaddingEnd(column, align, canSort),
                        getColumnWidthClasses(column, isPrimary),
                        linkProps && CssClickableRowCellClasses,
                      )}
                    >
                      {isPrimary && linkProps ? (
                        <RowLink
                          {...linkProps}
                          {...RowLinkAttributes}
                          className={CssRowLinkClasses}
                        >
                          {body}
                        </RowLink>
                      ) : (
                        body
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
