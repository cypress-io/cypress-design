<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <!-- Stats with a count of 0 are hidden. -->
  <RunResults :passed="22" :failed="4" :skipped="0" :pending="1" />
</template>
