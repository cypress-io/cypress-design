<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@cypress-design/vue-tabs'

const allowMove = ref(true)
const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', tag: '13', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
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
    active-id="ov"
    @switch="
      (_tab, e) => {
        if (!allowMove) e.preventDefault()
      }
    "
  />
</template>
