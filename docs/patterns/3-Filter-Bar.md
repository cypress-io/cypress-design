# Filter Bar

## WIP

```vue live
<!-- 3-Filter-Bar.md -->
<script setup lang="ts">
import { reactive } from 'vue'
import FilterItem from './FilterItem.vue'
import FilterRow from './FilterRow.vue'

// Define state
const state = reactive({
  filterItems: [
    {
      open: false,
      value: null,
      selected: null,
      activeDescendant: null,
      applied: false,
      items: [
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
    items: [
      // Define items for the new filterItem
      { id: 1, name: 'Default Item', image: 'https://example.com/default.jpg' },
    ],
  })
}

// Expose JSON.stringify to the template
const stringify = JSON.stringify
</script>

<template>
  <div class="p-14 border border-blue">
    <!-- <pre>{{ stringify(state.filterItems, null, 2) }}</pre>
    <pre>{{ state.filterItems.length }}</pre> -->

    <FilterRow :filterItems="state.filterItems" @add="addFilterItem">
      <FilterItem
        v-for="(filterItem, index) in state.filterItems"
        :key="index"
        :id="index"
        :item="filterItem"
      />
    </FilterRow>
  </div>
</template>
```
