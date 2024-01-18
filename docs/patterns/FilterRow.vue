<script setup lang="ts">
import { computed } from 'vue'
import FilterItem from './FilterItem.vue'

const props = defineProps({
  filterItems: {
    type: Array,
    required: true,
  },
})
</script>

<!-- FilterRow.vue -->
<template>
  <div class="border bg-white p-2 flex gap-2">
    <FilterItem
      v-for="(filterItem, index) in filterItems"
      :id="filterItem.id"
      :item="filterItem"
      :selected="filterItem.selected"
    />
  </div>
</template>
