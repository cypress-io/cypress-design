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

// Tab ids become element ids, so each Tabs on the page gets its own set.
const tabsFor = (prefix: string) =>
  tabs.map((tab) => ({ ...tab, id: `${prefix}-${tab.id}` }))
</script>

<template>
  <!-- For dark surfaces, in two sizes. -->
  <div class="flex flex-col items-start gap-4">
    <Tabs
      :tabs="tabsFor('vue-dark-small')"
      active-id="vue-dark-small-ov"
      variant="dark-small"
    />
    <Tabs
      :tabs="tabsFor('vue-dark-large')"
      active-id="vue-dark-large-ov"
      variant="dark-large"
    />
  </div>
</template>
