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
  // selected: {
  //   type: Boolean,
  //   default: false,
  // },
  // value: {
  //   type: Number,
  //   default: 0,
  // },
  // applied: {
  //   type: Boolean,
  //   default: false,
  // },
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
      <component :is="item.component">{{ item.name }}</component>
      <slot></slot>
    </div>
  </li>
</template>
