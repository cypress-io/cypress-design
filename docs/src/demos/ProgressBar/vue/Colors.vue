<script setup lang="ts">
import ProgressBar from '@cypress-design/vue-progressbar'

const colors = [
  'indigo',
  'indigo-light',
  'purple',
  'teal',
  'jade',
  'red',
  'orange',
  'gray',
] as const
</script>

<template>
  <div class="flex flex-col gap-4 rounded bg-white p-4">
    <ProgressBar
      v-for="color in colors"
      :key="color"
      :color="color"
      :value="60"
      :aria-label="`${color} bar`"
    />
  </div>
</template>
