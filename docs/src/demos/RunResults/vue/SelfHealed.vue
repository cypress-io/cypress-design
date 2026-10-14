<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <!-- `show-self-healed` gates the stat; its count renders even when 0. -->
  <RunResults
    :passed="22"
    :failed="4"
    :skipped="0"
    :pending="1"
    :self-healed="2"
    show-self-healed
  />
</template>
