<script setup lang="ts">
import Alert from '@cypress-design/vue-alert'

const variants = [
  'info',
  'success',
  'warning',
  'error',
  'neutral',
  'clear',
] as const
</script>

<template>
  <div class="flex flex-col gap-4">
    <Alert v-for="variant in variants" :key="variant" :variant="variant">
      This is a <code>{{ variant }}</code> message
    </Alert>
  </div>
</template>
