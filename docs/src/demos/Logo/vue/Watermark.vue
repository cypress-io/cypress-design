<script setup lang="ts">
import { CypressWatermark } from '@cypress-design/vue-logo'
</script>

<template>
  <!-- A faded mark for backgrounds; `dark` switches to the gray tint for light surfaces. -->
  <div class="flex items-center gap-8">
    <div class="rounded bg-gray-1000 p-4">
      <CypressWatermark class="h-[48px] w-[48px]" />
    </div>
    <CypressWatermark class="h-[48px] w-[48px]" dark />
  </div>
</template>
