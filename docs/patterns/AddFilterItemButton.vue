<script setup>
import { ref, defineProps } from 'vue'
import Icon from '@cypress-design/vue-icon'
import Button from '@cypress-design/vue-button'
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'

const components = { Icon }
const isOpen = ref(false)
const props = defineProps({
  availableFilterItems: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['addFilterItem'])

function handleAddFilterItem(filterItem) {
  emit('addFilterItem', filterItem)
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content .dropdown-item {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

<template>
  <div class="dropdown" @click="isOpen = !isOpen">
    <Button type="outline-indigo"> Add filter </Button>
    <div class="dropdown-content" v-if="isOpen">
      <div
        class="dropdown-item"
        v-for="filterItem in availableFilterItems"
        :key="filterItem.id"
        @click="handleAddFilterItem(filterItem)"
      >
        {{ filterItem.label }}
      </div>
    </div>
  </div>
</template>
