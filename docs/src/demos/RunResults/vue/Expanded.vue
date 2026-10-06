<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <!-- `expanded` shows all four regular stats, even when a count is 0. -->
  <RunResults :passed="22" :failed="4" :skipped="0" :pending="0" expanded />
</template>
