<script setup lang="ts">
import RunResults from '@cypress-design/vue-runresults'

// Each stat with a non-empty href renders as a link.
const links = {
  passed: '#passed',
  failed: '#failed',
  pending: '#pending',
  flaky: '#flaky',
}
</script>

<template>
  <RunResults
    :passed="22"
    :failed="4"
    :skipped="0"
    :pending="1"
    :flaky="3"
    :links="links"
  />
</template>
