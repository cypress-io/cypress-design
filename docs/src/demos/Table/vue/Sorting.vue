<script setup lang="ts">
import { ref } from 'vue'
import Table, { type TableSort } from '@cypress-design/vue-table'

type User = {
  id: string
  name: string
  calls: number
  lastActive: string
  minutesAgo: number
}

// Calls starts with the largest value; Last active sorts by `minutesAgo`
// so "2h ago" lands before "1d ago".
const columns = [
  { key: 'name', label: 'User', sortable: true },
  {
    key: 'calls',
    label: 'Calls',
    align: 'right' as const,
    sortable: true,
    firstSortDirection: 'descending' as const,
  },
  {
    key: 'lastActive',
    label: 'Last active',
    sortable: true,
    sortValue: (user: User) => user.minutesAgo,
  },
]

const rows: User[] = [
  {
    id: 'sam',
    name: 'Sam Rivera',
    calls: 316,
    lastActive: '1d ago',
    minutesAgo: 1440,
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    calls: 480,
    lastActive: '2h ago',
    minutesAgo: 120,
  },
  {
    id: 'priya',
    name: 'Priya Shah',
    calls: 188,
    lastActive: '2d ago',
    minutesAgo: 2880,
  },
  {
    id: 'maya',
    name: 'Maya Patel',
    calls: 431,
    lastActive: '3h ago',
    minutesAgo: 180,
  },
  {
    id: 'alex',
    name: 'Alex Kim',
    calls: 296,
    lastActive: '1d ago',
    minutesAgo: 1500,
  },
]

const sort = ref<TableSort>({ key: 'calls', direction: 'descending' })
</script>

<template>
  <Table
    v-model:sort="sort"
    aria-label="Usage"
    :columns="columns"
    :rows="rows"
  />
</template>
