<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <!-- Flaky renders as a leading stat whenever its count is above 0. -->
  <RunResults :passed="22" :failed="4" :skipped="0" :pending="1" :flaky="3" />
</template>
