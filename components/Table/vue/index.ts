import type { Component } from 'vue'
import type { TableColumnBase } from '@cypress-design/constants-table'

export { default } from './Table.vue'
export { default as Table } from './Table.vue'
export { getNextSort, sortRows } from '@cypress-design/constants-table'
export type {
  TableAlign,
  TableSort,
  TableSortDirection,
  TableSortValue,
} from '@cypress-design/constants-table'

// Vue icon components, matching what Table accepts for `icon` and `cellIcon`.
export type TableColumn<Row> = TableColumnBase<Row, Component>
