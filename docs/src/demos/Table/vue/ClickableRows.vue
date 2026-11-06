<script setup lang="ts">
import Table from '@cypress-design/vue-table'

type View = { id: string; view: string; snapshots: number; disabled?: boolean }

const columns = [
  { key: 'view', label: 'Views' },
  { key: 'snapshots', label: 'Snapshots', align: 'right' as const },
]

const rows: View[] = [
  { id: 'home', view: 'localhost:3000/', snapshots: 5692 },
  {
    id: 'branches',
    view: 'localhost:3000/projects/*/branches/*',
    snapshots: 4394,
  },
  {
    id: 'integrations',
    view: 'localhost:3000/projects/*/settings/integrations',
    snapshots: 3078,
    disabled: true,
  },
  {
    id: 'overview',
    view: 'localhost:3000/projects/*/runs/*/overview',
    snapshots: 3045,
  },
]

// Return `undefined` to leave a row non-clickable. Pass `RouterLink` as
// `row-link-as` and return `{ to }` to navigate with Vue Router.
const rowLink = (view: View) =>
  view.disabled ? undefined : { href: `#vue-view-${view.id}` }
</script>

<template>
  <Table
    aria-label="Views"
    :columns="columns"
    :rows="rows"
    :row-link="rowLink"
  />
</template>
