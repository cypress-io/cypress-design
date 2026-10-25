<script lang="ts" setup>
import { ref } from 'vue'
import Menu from '@cypress-design/vue-menu'
import {
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyServerAlt,
  IconTechnologyGitBranches,
  IconViewPieChart,
  IconAnimatedTechnologyServer,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedViewChart,
  IconObjectGear,
  IconAnimatedObjectGear,
  IconWindowCodeEditor,
} from '@cypress-design/vue-icon'

const activePath = ref('#runs')

const items = [
  {
    label: 'Runs',
    icon: IconTechnologyServerAlt,
    iconActive: IconAnimatedTechnologyServer,
    href: '#runs',
  },
  {
    label: 'Reviews',
    icon: IconGeneralChatBubble,
    iconActive: IconAnimatedGeneralChatBubble,
    href: '#reviews',
  },
  {
    label: 'Branches',
    icon: IconTechnologyGitBranches,
    iconActive: IconAnimatedTechnologyGitBranches,
    href: '#branches',
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
      'Slowest tests',
      'Most common errors',
      'Flaky tests',
    ].map((l) => ({
      label: l,
      href: `#${l.toLowerCase().replace(/ /g, '-')}`,
    })),
  },
  {
    label: 'Specs',
    icon: IconWindowCodeEditor,
    iconActive: IconWindowCodeEditor,
    href: '#specs',
  },
  {
    label: 'Settings',
    icon: IconObjectGear,
    iconActive: IconAnimatedObjectGear,
    href: '#settings',
  },
]

function onMousedown(e: MouseEvent) {
  const target = e.target as HTMLElement
  const link = target.closest('a') as HTMLAnchorElement | null
  if (link) {
    e.preventDefault()
    const hash = link.href.split('#')[1]
    if (hash) activePath.value = `#${hash}`
  }
}
</script>

<template>
  <Menu :activePath="activePath" :items="items" @mousedown="onMousedown" />
</template>
