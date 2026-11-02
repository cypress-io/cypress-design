<script setup lang="ts">
import Table from './vue/Table.vue'
import { IconDocumentBlank } from '@cypress-design/vue-icon'

const columns = [
  { key: 'view', label: 'Views', icon: IconDocumentBlank, sortable: true },
  { key: 'snapshots', label: 'Snapshots', align: 'right', sortable: true, firstSortDirection: 'descending' },
  { key: 'coverage', label: 'Coverage %', align: 'right', sortable: true },
]

const rows = [
  { id: 'home', view: 'localhost:3000/', snapshots: 5692, coverage: 72 },
  { id: 'branches', view: 'localhost:3000/projects/*/branches/*', snapshots: 4394, coverage: 74 },
  { id: 'overview', view: 'localhost:3000/projects/*/runs/*/overview', snapshots: 3045, coverage: 92 },
]
</script>

# Table

A data table built from a column config: header icons, sort buttons, per-column and per-cell alignment, optional clickable rows, and an optional sticky header.

<DemoWrapper>
  <Table aria-label="Views" :columns="columns" :rows="rows" :row-link="(row) => ({ href: `#${row.id}` })" />
</DemoWrapper>
