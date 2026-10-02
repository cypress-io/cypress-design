<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@cypress-design/vue-tabs'

const activeId = ref('ov')
const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'vue-tab-panels-panel-1' },
  {
    id: 'cl',
    label: 'Command Log',
    ['aria-controls']: 'vue-tab-panels-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'vue-tab-panels-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'vue-tab-panels-panel-4',
  },
]
</script>

<template>
  <!-- Tabs doesn't render panels: track the active id and show the matching one. -->
  <Tabs
    :tabs="tabs"
    :active-id="activeId"
    @switch="(tab) => (activeId = tab.id)"
  />
  <div
    v-for="(tab, i) in tabs"
    v-show="tab.id === activeId"
    :id="tab['aria-controls']"
    :key="tab.id"
    role="tabpanel"
    class="mt-4"
  >
    Tab panel {{ i + 1 }}
  </div>
</template>
