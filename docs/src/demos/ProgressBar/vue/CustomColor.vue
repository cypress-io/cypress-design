<script setup lang="ts">
import ProgressBar from '@cypress-design/vue-progressbar'
</script>

<template>
  <!-- `fill-class-name` is merged last, so any design-token `bg-*` class replaces the preset. `class` does the same for the track. -->
  <div class="rounded bg-white p-4">
    <ProgressBar
      :value="36"
      fill-class-name="bg-teal-600"
      class="bg-teal-50"
      aria-label="Included tests used"
    />
  </div>
</template>
