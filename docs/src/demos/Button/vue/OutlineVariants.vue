<script setup lang="ts">
import Button, { type ButtonVariants } from '@cypress-design/vue-button'

const variants: ButtonVariants[] = [
  'outline-indigo',
  'outline-purple',
  'outline-teal-dark',
  'outline-jade-light',
  'outline-jade-dark',
  'outline-red',
  'outline-gray-dark',
  'outline-light',
  'outline-gray-light',
  'outline-orange-dark',
  'outline-orange-light',
]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>
