<!-- FilterItem.vue -->
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  // other properties...
})

const emit = defineEmits(['add', 'remove'])

const add = () => {
  emit('add', props.id)
}

const remove = () => {
  emit('remove', props.id)
}
</script>

<template>
  <li
    role="option"
    :class="{
      'list-none': true,
      'text-white bg-indigo-600': selected,
      'text-gray-900': !selected,
    }"
    class="text-gray-900 cursor-default select-none relative py-2 pl-4 pr-9"
  >
    <div class="flex items-center space-x-3">
      <component v-if="item" :is="item.component" :label="item.label">{{
        item.label
      }}</component>
      <slot></slot>
    </div>
  </li>
</template>
