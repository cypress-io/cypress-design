<script setup lang="ts">
import Tabs from '@cypress-design/vue-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'vue-dark-panel-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'vue-dark-panel-2' },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'vue-dark-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'vue-dark-panel-4',
  },
]
</script>

<template>
  <!-- For dark surfaces, in two sizes. -->
  <div class="flex flex-col items-start gap-4">
    <Tabs :tabs="tabs" active-id="ov" variant="dark-small" />
    <Tabs :tabs="tabs" active-id="ov" variant="dark-large" />
  </div>
</template>
