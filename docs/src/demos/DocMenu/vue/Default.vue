<script setup lang="ts">
import DocMenu, {
  type NavGroup,
  type NavItemLink,
} from '@cypress-design/vue-docmenu'

// `activePath` highlights the item whose `href` matches it.
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
  <DocMenu active-path="#item1" :items="items" />
</template>
