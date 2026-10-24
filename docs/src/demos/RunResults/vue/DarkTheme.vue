<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <!-- Set `theme` explicitly; the component doesn't read a parent `dark` class. -->
  <div class="rounded bg-gray-900 p-4">
    <RunResults
      :passed="22"
      :failed="4"
      :skipped="0"
      :pending="1"
      :flaky="3"
      theme="dark"
    />
  </div>
</template>
