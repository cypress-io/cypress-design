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

```tsx live
<script setup lang="ts">
  import { reactive } from 'vue'
  import { allFilterItems } from './filterConstants.js'
  import FilterRow from './FilterRow.vue'
  import AddFilterItemButton from './AddFilterItemButton.vue'

  const state = reactive({
    filterItems: [],
    queryString: '',
    availableFilterItems: allFilterItems,
  })

  const addFilterItem = (filterItem) => {
    state.filterItems.push(filterItem);
    state.availableFilterItems = state.availableFilterItems.filter(
      (item) => item.id !== filterItem.id,
    )
  }

  const stringify = JSON.stringify

//   const queryString = computed(() => {
//   return props.filterItems
//     .filter((item) => item.applied)
//     .map((item) => `${item.name}=${item.value}`)
//     .join('&')
// })

  </script>

  <template>
    <div class="p-14 border border-blue">
      <FilterRow :filterItems="state.filterItems" @add="addFilterItem" />
      <AddFilterItemButton
        :filterItems="state.filterItems"
        :availableFilterItems="state.availableFilterItems"
        @addFilterItem="addFilterItem"
      />
    </div>
  </template>
```
