<!-- FilterRow.vue -->
<template>
  <div class="border bg-white p-2">
    <FilterItem
      v-for="(filterItem, index) in filterItems"
      :key="index"
      :id="index"
      :item="filterItem.item"
      @add="() => addFilter(filterItem)"
      @remove="() => removeFilter(filterItem)"
    >
      <template v-slot:default></template>
    </FilterItem>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FilterItem from './FilterItem.vue'

const props = defineProps({
  filterItems: {
    type: Array,
    required: true,
  },
})

const queryString = computed(() => {
  return props.filterItems
    .filter((item) => item.applied)
    .map((item) => `${item.name}=${item.value}`)
    .join('&')
})

const addFilter = (filterItem) => () => {
  emit('add', filterItem)
}

const removeFilter = (filterItem) => () => {
  emit('remove', filterItem)
}
</script>
