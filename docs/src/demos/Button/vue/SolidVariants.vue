<script setup lang="ts">
import Button, { type ButtonVariants } from '@cypress-design/vue-button'

// indigo-dark is the default variant.
const variants: ButtonVariants[] = [
  'indigo-dark',
  'jade-dark',
  'teal-dark',
  'purple-dark',
  'red-dark',
  'gray-dark',
  'gray-darkest',
]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>
