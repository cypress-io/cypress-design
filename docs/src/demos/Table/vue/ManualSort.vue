<script setup lang="ts">
import { computed, ref } from 'vue'
import Table, { type TableSort } from '@cypress-design/vue-table'

type User = { id: string; name: string; calls: number }

const columns = [
  { key: 'name', label: 'User', sortable: true },
  {
    key: 'calls',
    label: 'Calls',
    align: 'right' as const,
    sortable: true,
    firstSortDirection: 'descending' as const,
  },
]

const users: User[] = [
  { id: 'sam', name: 'Sam Rivera', calls: 316 },
  { id: 'jordan', name: 'Jordan Lee', calls: 480 },
  { id: 'priya', name: 'Priya Shah', calls: 188 },
  { id: 'maya', name: 'Maya Patel', calls: 431 },
]

// With `manual-sort` the table only shows the sort state. The page orders
// `rows` itself, for example from a server query or the URL.
const sort = ref<TableSort>({ key: 'calls', direction: 'descending' })
const rows = computed(() => {
  const { key, direction } = sort.value
  const order = direction === 'ascending' ? 1 : -1
  return [...users].sort((a, b) =>
    key === 'calls'
      ? (a.calls - b.calls) * order
      : a.name.localeCompare(b.name) * order,
  )
})
</script>

<template>
  <Table
    v-model:sort="sort"
    aria-label="Usage"
    manual-sort
    :columns="columns"
    :rows="rows"
  />
</template>
