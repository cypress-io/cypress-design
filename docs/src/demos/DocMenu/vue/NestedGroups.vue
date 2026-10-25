<script setup lang="ts">
import DocMenu, {
  type NavGroup,
  type NavItemLink,
} from '@cypress-design/vue-docmenu'

// Groups nest inside groups; each level indents further.
const items: (NavItemLink | NavGroup)[] = [
  { label: 'Get Started', href: '#get-started' },
  {
    label: 'Getting Started',
    items: [
      { label: 'Item 1', href: '#item-1' },
      {
        label: 'Group',
        items: [
          { label: 'Item 1', href: '#group-item-1' },
          { label: 'Item 2', href: '#group-item-2' },
          { label: 'Item 3', href: '#group-item-3' },
          { label: 'Item 4', href: '#group-item-4' },
        ],
      },
      { label: 'Item 5', href: '#' },
    ],
  },
]
</script>

<template>
  <DocMenu active-path="#group-item-3" :items="items" />
</template>
