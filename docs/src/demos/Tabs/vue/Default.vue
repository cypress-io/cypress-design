<script setup lang="ts">
import Tabs from '@cypress-design/vue-tabs'

// Each tab's `aria-controls` points at the id of the panel it shows.
const tabs = [
  {
    id: 'vue-default-ov',
    label: 'Overview',
    ['aria-controls']: 'vue-default-panel-1',
  },
  {
    id: 'vue-default-cl',
    label: 'Command Log',
    ['aria-controls']: 'vue-default-panel-2',
  },
  {
    id: 'vue-default-err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'vue-default-panel-3',
  },
  {
    id: 'vue-default-reco',
    label: 'Recommendations',
    ['aria-controls']: 'vue-default-panel-4',
  },
]
</script>

<template>
  <Tabs :tabs="tabs" active-id="vue-default-ov" />
</template>
