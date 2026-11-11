<script setup lang="ts">
import { ref } from 'vue'
import Table, {
  type TableColumn,
  type TableSort,
} from '@cypress-design/vue-table'
import ProgressBar from '@cypress-design/vue-progressbar'

type User = {
  id: string
  name: string
  initials: string
  calls: number
  lastActive: string
  lastActiveMinutes: number
}

// Each bar shows the user's share of every call in the org.
const TotalCalls = 3000

const users: User[] = [
  {
    id: 'ava',
    name: 'Ava Thompson',
    initials: 'AT',
    calls: 480,
    lastActive: '2h ago',
    lastActiveMinutes: 120,
  },
  {
    id: 'noah',
    name: 'Noah Patel',
    initials: 'NP',
    calls: 431,
    lastActive: '3h ago',
    lastActiveMinutes: 180,
  },
  {
    id: 'mia',
    name: 'Mia Fernandez',
    initials: 'MF',
    calls: 316,
    lastActive: '1d ago',
    lastActiveMinutes: 1440,
  },
  {
    id: 'liam',
    name: 'Liam Okafor',
    initials: 'LO',
    calls: 296,
    lastActive: '1d ago',
    lastActiveMinutes: 1500,
  },
  {
    id: 'zoe',
    name: 'Zoe Laurent',
    initials: 'ZL',
    calls: 237,
    lastActive: '1d ago',
    lastActiveMinutes: 1560,
  },
  {
    id: 'ethan',
    name: 'Ethan Kowalski',
    initials: 'EK',
    calls: 214,
    lastActive: '1d ago',
    lastActiveMinutes: 1620,
  },
  {
    id: 'iris',
    name: 'Iris Nakamura',
    initials: 'IN',
    calls: 188,
    lastActive: '2d ago',
    lastActiveMinutes: 2880,
  },
  {
    id: 'omar',
    name: 'Omar Haddad',
    initials: 'OH',
    calls: 152,
    lastActive: '3d ago',
    lastActiveMinutes: 4320,
  },
]

// `primary` gives the bar column the leftover width; the number beside the
// bar carries the value in text.
const columns: TableColumn<User>[] = [
  { key: 'name', label: 'User', sortable: true },
  {
    key: 'calls',
    label: 'Calls',
    primary: true,
    sortable: true,
    firstSortDirection: 'descending',
  },
  {
    key: 'lastActive',
    label: 'Last active',
    sortable: true,
    sortValue: (user) => user.lastActiveMinutes,
  },
]

const sort = ref<TableSort | null>({ key: 'calls', direction: 'descending' })
</script>

<template>
  <div class="overflow-hidden rounded border border-gray-100 bg-white">
    <!-- `cell-<key>` slots put any content in a cell. -->
    <Table
      v-model:sort="sort"
      aria-label="Calls by user"
      :columns="columns"
      :rows="users"
    >
      <template #cell-name="{ row }">
        <span class="flex items-center gap-3 whitespace-nowrap">
          <span
            aria-hidden="true"
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-sm font-medium text-gray-900"
          >
            {{ row.initials }}
          </span>
          {{ row.name }}
        </span>
      </template>
      <template #cell-calls="{ row }">
        <span class="flex items-center gap-6">
          <ProgressBar
            class="flex-1"
            :value="row.calls"
            :max="TotalCalls"
            :aria-label="`${row.name} calls`"
            :value-text="`${row.calls} of ${TotalCalls} calls`"
          />
          <span class="w-10 text-right tabular-nums">{{ row.calls }}</span>
        </span>
      </template>
      <template #cell-lastActive="{ row }">
        <span class="whitespace-nowrap text-gray-700">{{
          row.lastActive
        }}</span>
      </template>
    </Table>
    <a
      href="#vue-all-users"
      class="block px-4 py-3 text-indigo-500 hover:underline"
    >
      View all 14 users
    </a>
  </div>
</template>
