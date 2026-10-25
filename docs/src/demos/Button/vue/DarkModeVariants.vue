<script setup lang="ts">
import Button, { type ButtonVariants } from '@cypress-design/vue-button'

// Dark mode variants are for dark surfaces.
const variants: ButtonVariants[] = [
  'outline-dark',
  'outline-red-dark-mode',
  'outline-jade-dark-mode',
  'outline-indigo-dark-mode',
  'outline-purple-dark-mode',
  'red-dark-mode',
  'purple-dark-mode',
  'indigo-dark-mode',
]
</script>

<template>
  <div class="flex flex-wrap gap-4 rounded bg-gray-1000 p-4">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>
