<script setup lang="ts">
import Alert from '@cypress-design/vue-alert'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex flex-col gap-4">
    <Alert v-for="size in sizes" :key="size" :size="size">
      This is a <code>{{ size }}</code> alert
    </Alert>
  </div>
</template>
