<script lang="ts" setup generic="Row">
import { type Component, type VNode, computed, normalizeClass, ref } from 'vue'
import { twMerge } from 'tailwind-merge'
import { IconArrowDown, IconArrowUp } from '@cypress-design/vue-icon'
import CellContent from './_TableCellContent.vue'
import {
  type TableColumnBase,
  type TableRowKey,
  type TableSort,
  CssAlignClasses,
  CssBodyCellClasses,
  CssClickableRowCellClasses,
  CssClickableRowClasses,
  CssHeaderCellClasses,
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
  sortRows,
} from '@cypress-design/constants-table'

type TableColumn = TableColumnBase<Row, Component>

// The root is the scroll wrapper; `class` and other attributes belong on the
// `<table>`, same as the React component. `class` is merged with twMerge so a
// consumer class (e.g. `bg-gray-50`) overrides the default; normalizeClass
// flattens Vue's object and array class syntax first.
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    rows: Row[]
    /**
     * Field name or function giving each row a unique, stable key.
     */
    rowKey?: TableRowKey<Row>
    /**
     * Current sort; bind with `v-model:sort`.
     */
    sort?: TableSort | null
    /**
     * Show the sort state without reordering `rows`; the page sorts them.
     */
    manualSort?: boolean
    /**
     * Returns the props for a row's link, or `undefined` for a non-clickable row.
     */
    rowLink?: (row: Row) => Record<string, unknown> | undefined
    /**
     * Element or component that renders row links, e.g. `RouterLink`.
     */
    rowLinkAs?: string | Component
    /**
     * Pin the header row to the top of the nearest scrolling ancestor.
     */
    stickyHeader?: boolean
  }>(),
  {
    rowKey: 'id',
    sort: undefined,
    manualSort: false,
    rowLink: undefined,
    rowLinkAs: 'a',
    stickyHeader: false,
  },
)

const emit = defineEmits<{
  (event: 'update:sort', sort: TableSort): void
}>()

defineSlots<
  {
    [K in `cell-${string}`]?: (props: { row: Row; value: unknown }) => VNode[]
  } & {
    [K in `header-${string}`]?: (props: { column: TableColumn }) => VNode[]
  }
>()

// Bound `sort` (including `null`) makes the table controlled: clicks only emit
// `update:sort` and the parent decides. Unbound, the table keeps its own sort.
const localSort = ref<TableSort | null>(null)
const isControlled = computed(() => props.sort !== undefined)
const currentSort = computed(() =>
  isControlled.value ? props.sort ?? null : localSort.value,
)

const primaryKey = computed(() => getPrimaryColumnKey(props.columns))

const displayedRows = computed(() =>
  (props.manualSort
    ? props.rows
    : sortRows(props.rows, props.columns, currentSort.value)
  ).map((row) => ({
    row,
    key: getRowKey(row, props.rowKey),
    link: props.rowLink?.(row),
    // Resolved once per cell; the template reads each in several places.
    cells: props.columns.map((column) => {
      const value = getCellValue(row, column)
      const isPrimary = column.key === primaryKey.value
      return {
        column,
        value,
        isPrimary,
        align: getCellAlign(column, row),
        icon: column.cellIcon?.(row),
        title: column.truncate && typeof value === 'string' ? value : undefined,
        widthClass: getCellContentWidthClasses(column, isPrimary),
      }
    }),
  })),
)

function handleSort(column: TableColumn) {
  const next = getNextSort(column, currentSort.value)
  if (!isControlled.value) localSort.value = next
  emit('update:sort', next)
}

function handleRowClick(event: MouseEvent) {
  followRowLink(event, event.currentTarget as HTMLElement)
}
</script>

<template>
  <div :class="{ [CssScrollContainerClasses]: !stickyHeader }">
    <table
      v-bind="{ ...$attrs, class: undefined }"
      :class="twMerge(CssTableClasses, normalizeClass($attrs.class))"
    >
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :aria-sort="
              currentSort?.key === column.key
                ? currentSort.direction
                : undefined
            "
            :class="[
              CssHeaderCellClasses,
              CssAlignClasses[getHeaderAlign(column)],
              {
                [CssStickyHeaderCellClasses]: stickyHeader,
              },
              getColumnWidthClasses(column, column.key === primaryKey),
            ]"
          >
            <component
              :is="column.sortable ? 'button' : 'span'"
              :type="column.sortable ? 'button' : undefined"
              :class="
                column.sortable
                  ? CssSortButtonClasses
                  : [CssIconContentClasses, CssContentWidthClasses.fit]
              "
              @click="column.sortable ? handleSort(column) : undefined"
            >
              <component
                :is="column.icon"
                v-if="column.icon"
                aria-hidden="true"
                :class="CssIconClasses"
                :stroke-color="IconStrokeColor"
                :fill-color="IconFillColor"
              />
              <span :class="CssLabelClasses">
                <slot :name="`header-${column.key}`" :column="column">
                  {{ column.label }}
                </slot>
              </span>
              <span
                v-if="column.sortable"
                :class="[
                  CssSortIndicatorClasses,
                  {
                    [CssSortIndicatorHiddenClasses]:
                      currentSort?.key !== column.key,
                  },
                ]"
              >
                <component
                  :is="
                    getArrowDirection(column, currentSort) === 'ascending'
                      ? IconArrowUp
                      : IconArrowDown
                  "
                  aria-hidden="true"
                  :stroke-color="SortArrowStrokeColor"
                />
              </span>
            </component>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ row, key, link, cells } in displayedRows"
          :key="key"
          :class="{ [CssClickableRowClasses]: link }"
          @click="link && handleRowClick($event)"
          @auxclick="link && handleRowClick($event)"
        >
          <td
            v-for="{
              column,
              value,
              isPrimary,
              align,
              icon,
              title,
              widthClass,
            } in cells"
            :key="column.key"
            v-bind="link && isPrimary ? RowLinkCellAttributes : {}"
            :class="[
              CssBodyCellClasses,
              CssAlignClasses[align],
              getBodyCellPaddingEnd(column, align),
              getColumnWidthClasses(column, isPrimary),
              { [CssClickableRowCellClasses]: link },
            ]"
          >
            <component
              :is="rowLinkAs"
              v-if="link && isPrimary"
              v-bind="link"
              :class="CssRowLinkClasses"
            >
              <CellContent
                :icon="icon"
                :truncate="column.truncate"
                :width-class="widthClass"
                :title="title"
              >
                <slot :name="`cell-${column.key}`" :row="row" :value="value">
                  {{ value }}
                </slot>
              </CellContent>
            </component>
            <CellContent
              v-else
              :icon="icon"
              :truncate="column.truncate"
              :width-class="widthClass"
              :title="title"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="value">
                {{ value }}
              </slot>
            </CellContent>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
