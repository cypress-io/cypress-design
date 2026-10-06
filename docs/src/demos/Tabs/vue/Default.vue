<script setup lang="ts">
import Tabs from '@cypress-design/vue-tabs'

// Each tab's `aria-controls` points at the id of the panel it shows.
const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'vue-default-panel-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'vue-default-panel-2' },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'vue-default-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'vue-default-panel-4',
  },
]
</script>

<template>
  <Tabs :tabs="tabs" active-id="ov" />
</template>
