<script setup lang="ts">
import Table from '@cypress-design/vue-table'

type View = {
  id: string
  view: string
  snapshots: number
  tested: number
  total: number
  coverage: number
}

// `align` sets the header and cells; `cellAlign` overrides single cells.
// A view with no elements shows a centered dash instead of "0 of 0".
const columns = [
  { key: 'view', label: 'Views' },
  { key: 'snapshots', label: 'Snapshots', align: 'right' as const },
  {
    key: 'tested',
    label: 'Tested elements',
    align: 'right' as const,
    cellAlign: (view: View) => (view.total ? 'right' : 'center'),
  },
  { key: 'coverage', label: 'Coverage %', align: 'right' as const },
]

const rows: View[] = [
  {
    id: 'home',
    view: 'localhost:3000/',
    snapshots: 5692,
    tested: 38,
    total: 53,
    coverage: 72,
  },
  {
    id: 'branches',
    view: 'localhost:3000/projects/*/branches/*',
    snapshots: 4394,
    tested: 73,
    total: 98,
    coverage: 74,
  },
  {
    id: 'integrations',
    view: 'localhost:3000/projects/*/settings/integrations',
    snapshots: 3078,
    tested: 67,
    total: 88,
    coverage: 76,
  },
  {
    id: 'overview',
    view: 'localhost:3000/projects/*/runs/*/overview',
    snapshots: 3045,
    tested: 54,
    total: 59,
    coverage: 92,
  },
  {
    id: 'billing',
    view: 'localhost:3000/organizations/*/billing',
    snapshots: 2547,
    tested: 42,
    total: 45,
    coverage: 93,
  },
  {
    id: 'pricing',
    view: 'localhost:3000/pricing',
    snapshots: 12,
    tested: 0,
    total: 0,
    coverage: 0,
  },
]
</script>

<template>
  <Table aria-label="Views" :columns="columns" :rows="rows">
    <template #cell-tested="{ row }">
      {{ row.total ? `${row.tested} of ${row.total}` : '—' }}
    </template>
    <template #cell-coverage="{ row }">{{ row.coverage }}%</template>
  </Table>
</template>
