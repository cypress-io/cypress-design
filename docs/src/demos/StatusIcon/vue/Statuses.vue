<script setup lang="ts">
import { StatusIcon, type StatusType } from '@cypress-design/vue-statusicon'

const statuses: StatusType[] = [
  'running',
  'failing',
  'passed',
  'failed',
  'unclaimed',
  'placeholder',
  'cancelled',
  'noTests',
  'errored',
  'timedOut',
  'overLimit',
  'skipped',
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div
      v-for="status in statuses"
      :key="status"
      class="flex items-center gap-2"
    >
      <StatusIcon :status="status" variant="outline" size="16" />
      {{ status }}
    </div>
  </div>
</template>
