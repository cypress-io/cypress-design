<script lang="ts" setup>
import Tabs from '@cypress-design/vue-tabs'
import {
  IconActionPlayVideo,
  IconActionRecord,
  IconGeneralCrosshairs,
  IconSecurityLockLocked,
} from '@cypress-design/vue-icon'

const demoTabsSmall = [
  {
    id: 'ov',
    label: 'Overview',
    icon: IconActionPlayVideo,
    active: true,
    ['aria-controls']: 'tabpanel-id-1',
  },
  {
    id: 'cl',
    label: 'Command Log',
    icon: IconActionRecord,
    ['aria-controls']: 'tabpanel-id-2',
  },
  {
    id: 'err',
    label: 'Errors',
    iconAfter: IconSecurityLockLocked,
    tag: '13',
    ['aria-controls']: 'tabpanel-id-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    icon: IconGeneralCrosshairs,
    ['aria-controls']: 'tabpanel-id-4',
  },
]

const demoTabsLarge = [
  {
    id: 'ov',
    label: 'Overview',
    active: true,
    ['aria-controls']: 'tabpanel-id-1',
  },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', tag: '13', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
]

const types = [
  'default',
  'indigo-light',
  'dark-small',
  'dark-large',
  'underline-small',
  'underline-center',
  'underline-large',
]
</script>

<template>
  <template v-for="type in types" :key="type">
    <p>{{ type }}</p>
    <Tabs
      :variant="type"
      :tabs="type.includes('large') ? demoTabsLarge : demoTabsSmall"
    />
    <div class="h-[20px]" />
  </template>
</template>
