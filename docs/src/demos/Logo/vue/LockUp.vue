<script setup lang="ts">
import { CypressLockUp } from '@cypress-design/vue-logo'
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <CypressLockUp class="h-[48px] w-[119px]" />
    <CypressLockUp class="h-[48px] w-[119px]" variant="color-dark" />
    <div class="rounded bg-gray-1000 p-4">
      <CypressLockUp class="h-[48px] w-[119px]" variant="white" />
    </div>
    <div class="rounded bg-gray-1000 p-4">
      <CypressLockUp class="h-[48px] w-[119px]" variant="color-white" />
    </div>
  </div>
</template>
