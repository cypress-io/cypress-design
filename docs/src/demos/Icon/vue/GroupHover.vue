<script setup lang="ts">
import { IconObjectBook } from '@cypress-design/vue-icon'
</script>

<template>
  <!-- `interactive-colors-on-group` triggers hover colors from the parent `group`. -->
  <button
    class="group flex items-center gap-2 font-medium text-indigo-500 hover:text-jade-600"
  >
    <IconObjectBook
      size="24"
      fill-color="indigo-200"
      stroke-color="indigo-600"
      hover-fill-color="jade-200"
      hover-stroke-color="teal-600"
      interactive-colors-on-group
    />
    Hover the button
  </button>
</template>
