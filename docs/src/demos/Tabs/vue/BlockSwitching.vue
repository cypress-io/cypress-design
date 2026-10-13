<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@cypress-design/vue-tabs'

const allowMove = ref(true)
const tabs = [
  {
    id: 'vue-block-switching-ov',
    label: 'Overview',
    ['aria-controls']: 'vue-block-switching-panel-1',
  },
  {
    id: 'vue-block-switching-cl',
    label: 'Command Log',
    ['aria-controls']: 'vue-block-switching-panel-2',
  },
  {
    id: 'vue-block-switching-err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'vue-block-switching-panel-3',
  },
  {
    id: 'vue-block-switching-reco',
    label: 'Recommendations',
    ['aria-controls']: 'vue-block-switching-panel-4',
  },
]
</script>

<template>
  <label class="mb-4 flex items-center gap-2">
    <input v-model="allowMove" type="checkbox" />
    Allow tab move
  </label>
  <!-- Calling preventDefault() in the switch handler keeps the current tab. -->
  <Tabs
    :tabs="tabs"
    active-id="vue-block-switching-ov"
    @switch="
      (_tab, e) => {
        if (!allowMove) e.preventDefault()
      }
    "
  />
</template>
