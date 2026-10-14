<script setup lang="ts">
import { StatusIcon } from '@cypress-design/vue-statusicon'

// At 4 and 8, every status renders as a filled dot.
const sizes = ['4', '8', '12', '16', '24'] as const
</script>

<template>
  <div class="flex items-center gap-4">
    <StatusIcon
      v-for="size in sizes"
      :key="size"
      :size="size"
      status="failed"
      variant="solid"
    />
  </div>
</template>
