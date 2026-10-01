<script setup lang="ts">
import Tabs from '@cypress-design/vue-tabs'
import {
  IconActionPlayVideo,
  IconActionRecord,
  IconGeneralCrosshairs,
  IconSecurityLockLocked,
} from '@cypress-design/vue-icon'

// `icon` renders before the label, `iconAfter` after it.
const tabs = [
  {
    id: 'ov',
    label: 'Overview',
    icon: IconActionPlayVideo,
    ['aria-controls']: 'vue-icons-panel-1',
  },
  {
    id: 'cl',
    label: 'Command Log',
    icon: IconActionRecord,
    ['aria-controls']: 'vue-icons-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    iconAfter: IconSecurityLockLocked,
    tag: '13',
    ['aria-controls']: 'vue-icons-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    icon: IconGeneralCrosshairs,
    ['aria-controls']: 'vue-icons-panel-4',
  },
]
</script>

<template>
  <Tabs :tabs="tabs" active-id="ov" />
</template>
