# Filters

A FilterRow is composed of FilterItems. Each FilterItem is an arbitrary component that renders a list of options which can be selected, and are used to filter a list of results.

## WIP

```vue live
<script setup lang="ts">
import { reactive } from 'vue'
import FilterItem from './FilterItem.vue'
import FilterRow from './FilterRow.vue'
import AddFilterItemButton from './AddFilterItemButton.vue' // Import the AddFilterItemButton component

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

// Define filter types
const filterTypes = reactive([
  'Status',
  'Flaky tests',
  'Last modified',
  'Spec file',
  'Run group',
  'Browser',
  'OS',
  'Testing type',
])

// Method to add filter item and remove it from filter types
const addFilterItem = (filterType) => {
  // Add a new filterItem
  state.filterItems.push({
    open: false,
    value: null,
    selected: null,
    activeDescendant: null,
    applied: false,
    options: [],
    item: { name: filterType },
  })

  // Remove filterType from filterTypes
  const index = filterTypes.indexOf(filterType)
  if (index !== -1) {
    filterTypes.splice(index, 1)
  }
}

// Expose JSON.stringify to the template
const stringify = JSON.stringify
</script>

<template>
  <div class="p-14 border border-blue">
    <FilterRow :filterItems="state.filterItems" @add="addFilterItem" />
    <AddFilterItemButton
      :filterItems="state.filterItems"
      :filterTypes="filterTypes"
      @add="addFilterItem"
    />
  </div>
</template>
```
