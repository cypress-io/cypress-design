<!-- FilterRow.vue -->
<template>
  <div>
    <FilterItem
      v-for="(filterItem, index) in filterItems"
      :key="index"
      :id="index"
      :item="filterItem"
      @apply="applyFilter(filterItem)"
      @remove="removeFilter(filterItem)"
    >
      <template v-slot:default> </template>
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

const applyFilter = (filterItem) => {
  filterItem.applied = true
}

const removeFilter = (filterItem) => {
  filterItem.applied = false
}

const addFilter = () => {
  emit('add')
}
</script>
