<script setup lang="ts">
import { StatusIcon } from '@cypress-design/vue-statusicon'

// A status without an icon for the variant falls back to one it has.
const variants = ['outline', 'simple', 'solid'] as const
</script>

<template>
  <div class="flex items-center gap-8">
    <div
      v-for="variant in variants"
      :key="variant"
      class="flex items-center gap-2"
    >
      <StatusIcon status="failed" :variant="variant" />
      {{ variant }}
    </div>
  </div>
</template>
