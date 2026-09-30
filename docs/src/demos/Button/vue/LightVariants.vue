<script setup lang="ts">
import Button, { type ButtonVariants } from '@cypress-design/vue-button'

const variants: ButtonVariants[] = [
  'indigo-light',
  'jade-light',
  'white',
  'link',
]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>
