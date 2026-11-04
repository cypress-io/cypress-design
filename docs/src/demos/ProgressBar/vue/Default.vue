<script setup lang="ts">
import ProgressBar from '@cypress-design/vue-progressbar'
</script>

<template>
  <!-- The bar renders no text, so always give it a name. -->
  <div class="rounded bg-white p-4">
    <ProgressBar :value="36" aria-label="Included tests used" />
  </div>
</template>
