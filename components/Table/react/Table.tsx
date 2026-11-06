import * as React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IconArrowDown, IconArrowUp } from '@cypress-design/react-icon'
import {
  type TableColumnBase,
  type TableRowKey,
  type TableSort,
  CssAlignClasses,
  CssBodyCellClasses,
  CssClickableRowCellClasses,
  CssClickableRowClasses,
  CssHeaderCellClasses,
  CssHeaderRowClasses,
  CssContentWidthClasses,
  CssIconClasses,
  CssIconContentClasses,
  CssLabelClasses,
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
  RowLinkCellAttributes,
  SortArrowStrokeColor,
  followRowLink,
  getArrowDirection,
  getBodyCellPaddingEnd,
  getCellAlign,
  getCellContentWidthClasses,
  getCellValue,
  getColumnWidthClasses,
  getHeaderAlign,
  getNextSort,
  getPrimaryColumnKey,
  getRowKey,
  setTitleFromText,
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

function TableInner<Row>(
  {
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
  }: TableProps<Row>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const [internalSort, setInternalSort] = React.useState<TableSort | null>(
    defaultSort ?? null,
  )
  const isControlled = sortProp !== undefined
  const sort = isControlled ? sortProp : internalSort

  const primaryKey = getPrimaryColumnKey(columns)

  // Recomputed whenever `columns` changes identity, so consumers should define
  // columns outside the component or memoize them.
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
      {/* Merged so a consumer class (e.g. `bg-gray-50`) overrides the default. */}
      <table
        ref={ref}
        className={twMerge(CssTableClasses, className)}
        {...rest}
      >
        <thead className={CssHeaderRowClasses}>
          <tr className={CssHeaderRowClasses}>
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
                  <span className={CssLabelClasses}>{column.label}</span>
                </>
              )

              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={isSorted ? sort.direction : undefined}
                  className={clsx(
                    CssHeaderCellClasses,
                    CssAlignClasses[getHeaderAlign(column)],
                    stickyHeader && CssStickyHeaderCellClasses,
                    getColumnWidthClasses(column, column.key === primaryKey),
                  )}
                >
                  {column.sortable ? (
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
                    <span
                      className={clsx(
                        CssIconContentClasses,
                        CssContentWidthClasses.fit,
                      )}
                    >
                      {label}
                    </span>
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
                className={clsx(
                  linkProps &&
                    CssClickableRowClasses[stickyHeader ? 'sticky' : 'default'],
                )}
                onClick={linkProps ? handleRowClick : undefined}
                onAuxClick={linkProps ? handleRowClick : undefined}
              >
                {columns.map((column) => {
                  const isPrimary = column.key === primaryKey
                  const value = getCellValue(row, column)
                  const content = column.render
                    ? column.render(row)
                    : (value as React.ReactNode)
                  // `render` output that isn't plain text gets its tooltip from
                  // the rendered text on hover.
                  const text = column.render
                    ? typeof content === 'string' || typeof content === 'number'
                      ? String(content)
                      : undefined
                    : typeof value === 'string'
                      ? value
                      : undefined
                  const title = column.truncate ? text : undefined
                  const onTitleHover =
                    column.truncate && text === undefined && column.render
                      ? setTitleFromText
                      : undefined
                  const align = getCellAlign(column, row)
                  const CellIcon = column.cellIcon?.(row)
                  const widthClasses = getCellContentWidthClasses(
                    column,
                    isPrimary,
                  )
                  const body = CellIcon ? (
                    <span className={clsx(CssIconContentClasses, widthClasses)}>
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
                        onMouseEnter={
                          onTitleHover &&
                          ((event) => onTitleHover(event.currentTarget))
                        }
                      >
                        {content}
                      </span>
                    </span>
                  ) : column.truncate ? (
                    <span
                      className={clsx(CssTruncateClasses, widthClasses)}
                      title={title}
                      onMouseEnter={
                        onTitleHover &&
                        ((event) => onTitleHover(event.currentTarget))
                      }
                    >
                      {content}
                    </span>
                  ) : (
                    content
                  )

                  return (
                    <td
                      key={column.key}
                      {...(isPrimary && linkProps && RowLinkCellAttributes)}
                      className={clsx(
                        CssBodyCellClasses,
                        CssAlignClasses[align],
                        getBodyCellPaddingEnd(column, align),
                        getColumnWidthClasses(column, isPrimary),
                        linkProps && CssClickableRowCellClasses,
                      )}
                    >
                      {isPrimary && linkProps ? (
                        <RowLink
                          {...linkProps}
                          className={clsx(
                            CssRowLinkClasses,
                            linkProps.className as string | undefined,
                          )}
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

// `forwardRef` drops the `Row` generic, so the cast restores it.
export const Table = React.forwardRef(TableInner) as <Row>(
  props: TableProps<Row> & { ref?: React.Ref<HTMLTableElement> },
) => React.ReactElement

export default Table
