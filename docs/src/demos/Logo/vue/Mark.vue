<script setup lang="ts">
import { CypressMark } from '@cypress-design/vue-logo'
</script>

<template>
  <!-- The default variant takes its color from the text color. -->
  <div class="flex items-center gap-8">
    <CypressMark class="h-[48px] w-[48px] text-gray-500" />
    <CypressMark class="h-[48px] w-[48px]" variant="color-dark" />
    <div class="rounded bg-gray-1000 p-4">
      <CypressMark class="h-[48px] w-[48px]" variant="color-white" />
    </div>
  </div>
</template>
