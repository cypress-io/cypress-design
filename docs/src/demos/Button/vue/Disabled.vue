<script setup lang="ts">
import Button, { type ButtonVariants } from '@cypress-design/vue-button'

// `disabled` restyles each variant. The `disabled` and `outline-disabled`
// variants render disabled on their own.
const variants: ButtonVariants[] = [
  'indigo-dark',
  'indigo-light',
  'outline-indigo',
  'white',
  'link',
]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Button
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      disabled
    >
      {{ variant }}
    </Button>
  </div>
</template>
