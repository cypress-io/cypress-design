# Table

## Install

```bash
npm install @cypress-design/vue-table
```

or with yarn

```bash
yarn add @cypress-design/vue-table
```

## Usage

```ts
import Table from '@cypress-design/vue-table'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Table, { type TableSort } from '@cypress-design/vue-table'

const sort = ref<TableSort>({ key: 'calls', direction: 'descending' })
</script>

<template>
  <Table
    v-model:sort="sort"
    aria-label="Usage"
    :columns="[
      { key: 'name', label: 'User', sortable: true },
      {
        key: 'calls',
        label: 'Calls',
        align: 'right',
        sortable: true,
        firstSortDirection: 'descending',
      },
    ]"
    :rows="[
      { id: 'jordan', name: 'Jordan Lee', calls: 480 },
      { id: 'maya', name: 'Maya Patel', calls: 431 },
    ]"
  />
</template>
```
