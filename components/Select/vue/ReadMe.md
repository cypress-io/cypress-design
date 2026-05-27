# Select

## Install

The Select component is contained in the `@cypress-design/vue-select` package. You'll also want to install `@cypress-design/constants-select` to get proper types for TypeScript.

```bash
npm install @cypress-design/vue-select @cypress-design/constants-select
```

or with yarn

```bash
yarn add @cypress-design/vue-select @cypress-design/constants-select
```

## Usage

```ts
import Select from '@cypress-design/vue-select'
import type { SelectItem } from '@cypress-design/constants-select'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Select from '@cypress-design/vue-select'

const value = ref<string | undefined>()
const items = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' },
]
</script>

<template>
  <Select v-model="value" :items="items" placeholder="Pick one" />
</template>
```

### Custom trigger

```vue
<Select :items="items" v-model="value">
  <template #trigger="{ open, selected, toggle }">
    <button :aria-expanded="open" @click="toggle">
      {{ selected?.label ?? 'Open' }}
    </button>
  </template>
</Select>
```

### Header with tabs + search, footer action

```vue
<Select
  v-model="value"
  :items="items"
  header-title="Pick a value"
  :header-tabs="[
    { id: 'all', label: 'All' },
    { id: 'mine', label: 'Mine' },
  ]"
  :header-active-tab="tab"
  searchable
  footer-label="Showing 3 of 12"
  :footer-action="{ label: 'Manage', onClick: () => {} }"
  :max-height="320"
  @header-tab-change="(id) => (tab = id)"
/>
```
