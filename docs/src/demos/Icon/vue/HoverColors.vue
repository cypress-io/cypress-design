<script setup lang="ts">
import { IconObjectBook } from '@cypress-design/vue-icon'
</script>

<template>
  <!-- Prefix a color prop with `hover` or `focus` to change it on interaction. -->
  <div class="flex items-center gap-2 font-medium text-gray-700">
    <IconObjectBook
      size="24"
      fill-color="indigo-200"
      stroke-color="indigo-600"
      hover-fill-color="jade-200"
      hover-stroke-color="teal-600"
    />
    Hover the icon
  </div>
</template>
