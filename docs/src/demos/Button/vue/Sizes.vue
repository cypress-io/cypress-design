<script setup lang="ts">
import Button from '@cypress-design/vue-button'

// Size is the button height in pixels. The default is 40.
const sizes = ['20', '24', '32', '40', '48'] as const
</script>

<template>
  <div class="flex items-center gap-4">
    <Button v-for="size in sizes" :key="size" :size="size">Button</Button>
  </div>
</template>
