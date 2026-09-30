<script setup lang="ts">
import Tabs from '@cypress-design/vue-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', tag: '13', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
]
</script>

<template>
  <!-- Same layout as the default, with an indigo active tab. -->
  <Tabs :tabs="tabs" active-id="ov" variant="indigo-light" />
</template>
