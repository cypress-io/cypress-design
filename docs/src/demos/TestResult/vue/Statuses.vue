<script setup lang="ts">
import TestResult from '@cypress-design/vue-testresult'

const statuses = [
  'passed',
  'failed',
  'errored',
  'skipped',
  'pending',
  'cancelled',
  'unclaimed',
  'placeholder',
  'running',
] as const
</script>

<template>
  <div class="bg-white p-4">
    <TestResult
      v-for="status in statuses"
      :key="status"
      :status="status"
      :names="['TestResult', 'StatusIcon', `should render as ${status}`]"
    />
  </div>
</template>
