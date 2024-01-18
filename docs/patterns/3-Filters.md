# Filters

A FilterRow is composed of FilterItems. Each FilterItem is an arbitrary component that renders a list of options which can be selected, and are used to filter a list of results.

## WIP

```vue live
<script setup lang="ts">
import { reactive } from 'vue'
import FilterItem from './FilterItem.vue'
import { allFilterItemTypes } from './filterConstants.js'
import FilterRow from './FilterRow.vue'
import AddFilterItemButton from './AddFilterItemButton.vue'

const state = reactive({
  filterItems: [],
  queryString: '',
  availableFilterItemTypes: allFilterItemTypes,
})

// Initialize filter item types (in the "Add filter" dropdown)
let availableFilterItemTypes = reactive(allFilterItemTypes)

// Add filter item
const addFilterItem = (filterType) => {
  state.filterItems.push({
    open: false,
    value: null,
    selected: null,
    activeDescendant: null,
    applied: false,
    options: [],
    item: { name: filterType },
  })

  // When we add the filterItem, we remove it from the menu
  state.availableFilterItemTypes = state.availableFilterItemTypes.filter(
    (item) => item !== filterType,
  )
}

// Expose JSON.stringify to the template
const stringify = JSON.stringify
</script>

<template>
  <div class="p-14 border border-blue">
    <FilterRow :filterItems="state.filterItems" @add="addFilterItem" />
    <AddFilterItemButton
      :filterItems="state.filterItems"
      :availableFilterItemTypes="state.availableFilterItemTypes"
      @add="addFilterItem"
    />
  </div>
</template>
```
