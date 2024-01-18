# Filters

A FilterRow is composed of FilterItems. Each FilterItem is an arbitrary component that renders a list of options which can be selected, and are used to filter a list of results.

## WIP

```vue live
<!-- 3-Filters.md -->
<script setup lang="ts">
import { reactive } from 'vue'
import FilterItem from './FilterItem.vue'
import FilterRow from './FilterRow.vue'

// Define state
const state = reactive({
  filterItems: [
    {
      item: { name: 'Item 1' },
      open: false,
      value: null,
      selected: null,
      activeDescendant: null,
      applied: false,
      options: [
        { id: 1, name: 'Item 1', image: 'https://example.com/image1.jpg' },
        { id: 2, name: 'Item 2', image: 'https://example.com/image2.jpg' },
        // Add more items as needed
      ],
    },
  ],
  queryString: '',
})

const addFilterItem = () => {
  // Add a new filterItem
  state.filterItems.push({
    open: false,
    value: null,
    selected: null,
    activeDescendant: null,
    applied: false,
    options: [],
    item: { name: 'hola' },
  })
}

// Expose JSON.stringify to the template
const stringify = JSON.stringify
</script>

<template>
  <div class="p-14 border border-blue">
    <!-- <pre>{{ stringify(state.filterItems, null, 2) }}</pre>
    <pre>{{ state.filterItems.length }}</pre> -->

    <FilterRow :filterItems="state.filterItems" @add="addFilterItem" />
    <button @click="addFilterItem">Add Filter Item</button>
  </div>
</template>
```
