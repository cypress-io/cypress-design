<script setup lang="ts">
import DocMenu, {
  type NavGroup,
  type NavItemLink,
} from '@cypress-design/vue-docmenu'

const items: (NavItemLink | NavGroup)[] = [
  { label: 'Page', href: '#page' },
  {
    label: 'Overview',
    items: [
      { label: 'Overview Item 1', href: '#item1' },
      { label: 'Overview Item 2', href: '#item2' },
    ],
  },
]
</script>

<template>
  <!-- With `collapsible` off, every group stays open and has no toggle. -->
  <DocMenu active-path="#item1" :items="items" :collapsible="false" />
</template>
