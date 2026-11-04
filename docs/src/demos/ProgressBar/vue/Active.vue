<script setup lang="ts">
import ProgressBar from '@cypress-design/vue-progressbar'
</script>

<template>
  <!-- `active` animates the fill while the work is still going. Turn it off when it stops. -->
  <div class="rounded bg-white p-4">
    <ProgressBar :value="36" active aria-label="Uploading test results" />
  </div>
</template>
