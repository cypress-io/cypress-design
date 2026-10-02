<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <!-- `pill-class-name` is merged with tailwind-merge, so it wins over the theme background. -->
  <div class="bg-gray-900 p-4 rounded">
    <RunResults
      :passed="22"
      :failed="4"
      :skipped="0"
      :pending="1"
      :flaky="3"
      theme="dark"
      pill-class-name="bg-gray-900"
    />
  </div>
</template>
