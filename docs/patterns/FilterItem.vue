<!-- FilterItem.vue -->
<template>
  <li
    role="option"
    @click="choose"
    @mouseenter="highlight"
    @mouseleave="unhighlight"
    :class="{
      'text-white bg-indigo-600': selected,
      'text-gray-900': !selected,
    }"
    class="text-gray-900 cursor-default select-none relative py-2 pl-4 pr-9"
  >
    <div class="flex items-center space-x-3">
      <span class="font-normal block truncate">
        {{ item || 'No name' }}
      </span>
      <slot></slot>
    </div>
  </li>
</template>

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
  value: {
    type: Number,
    default: 0,
  },
  applied: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['choose', 'highlight', 'unhighlight', 'remove'])

const choose = () => {
  emit('choose', props.id)
}

const highlight = () => {
  emit('highlight', props.id)
}

const unhighlight = () => {
  emit('unhighlight')
}

const remove = () => {
  emit('remove', props.id)
}
</script>
