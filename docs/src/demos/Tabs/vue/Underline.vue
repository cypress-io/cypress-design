<script setup lang="ts">
import Tabs from '@cypress-design/vue-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'vue-underline-panel-1' },
  {
    id: 'cl',
    label: 'Command Log',
    ['aria-controls']: 'vue-underline-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'vue-underline-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'vue-underline-panel-4',
  },
]

// Tab ids become element ids, so each Tabs on the page gets its own set.
const tabsFor = (prefix: string) =>
  tabs.map((tab) => ({ ...tab, id: `${prefix}-${tab.id}` }))
</script>

<template>
  <!-- A bottom border marks the active tab; center centers the tabs over a fading line. -->
  <div class="flex flex-col gap-4">
    <Tabs
      :tabs="tabsFor('vue-underline-small')"
      active-id="vue-underline-small-ov"
      variant="underline-small"
    />
    <Tabs
      :tabs="tabsFor('vue-underline-center')"
      active-id="vue-underline-center-ov"
      variant="underline-center"
    />
    <Tabs
      :tabs="tabsFor('vue-underline-large')"
      active-id="vue-underline-large-ov"
      variant="underline-large"
    />
  </div>
</template>
