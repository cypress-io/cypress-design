<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@cypress-design/vue-menu'
import {
  IconTechnologyServerAlt,
  IconAnimatedTechnologyServer,
  IconViewPieChart,
  IconAnimatedViewChart,
} from '@cypress-design/vue-icon'

const activePath = ref('#run-status')
// An item with `items` renders its children as an indented submenu.
const items = [
  {
    label: 'Runs',
    icon: IconTechnologyServerAlt,
    iconActive: IconAnimatedTechnologyServer,
    href: '#runs',
  },
  {
    label: 'Insights',
    icon: IconViewPieChart,
    iconActive: IconAnimatedViewChart,
    href: '#insights',
    items: [
      'Run status',
      'Run duration',
      'Test suite size',
      'Top failures',
      'Flaky tests',
    ].map((label) => ({
      label,
      href: `#${label.toLowerCase().replace(/ /g, '-')}`,
    })),
  },
]

function onMousedown(e: MouseEvent) {
  const link = (e.target as HTMLElement).closest('a')
  if (!link) return
  e.preventDefault()
  activePath.value = `#${link.href.split('#')[1]}`
}
</script>

<template>
  <div class="w-64">
    <Menu :active-path="activePath" :items="items" @mousedown="onMousedown" />
  </div>
</template>
