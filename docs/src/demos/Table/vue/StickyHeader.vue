<script setup lang="ts">
import Table from '@cypress-design/vue-table'

const columns = [
  { key: 'name', label: 'User' },
  { key: 'calls', label: 'Calls', align: 'right' as const },
]

const names = [
  'Jordan Lee',
  'Maya Patel',
  'Sam Rivera',
  'Alex Kim',
  'Priya Shah',
  'Chris Novak',
  'Dana Ortiz',
  'Eli Brooks',
  'Fatima Noor',
  'Gabe Torres',
  'Hana Sato',
  'Ivan Petrov',
]
const rows = names.map((name, i) => ({ id: name, name, calls: 480 - i * 30 }))
</script>

<template>
  <!-- The header sticks to the nearest scrolling ancestor. -->
  <div class="h-64 overflow-auto">
    <Table aria-label="Usage" sticky-header :columns="columns" :rows="rows" />
  </div>
</template>
