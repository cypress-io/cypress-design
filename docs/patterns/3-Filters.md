# Filters

A FilterRow is composed of FilterItems. Each FilterItem is an arbitrary component that renders a list of options which can be selected, and are used to filter a list of results.

A FilterItem can be:

- exposed (potentially selected, "is interactable" and appears in the Filter Set)
- selected (darkened color, has selected options, is "doing work" in the Filter Set)
- available (listed in the menu)

All of these can also have:

- active (being clicked)
- disabled (does not work)

## WIP exploration

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
