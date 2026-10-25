<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@cypress-design/vue-menu'
import {
  IconTechnologyServerAlt,
  IconAnimatedTechnologyServer,
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyGitBranches,
  IconAnimatedTechnologyGitBranches,
  IconObjectGear,
  IconAnimatedObjectGear,
} from '@cypress-design/vue-icon'

// The item whose `href` matches `activePath` is highlighted.
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
    label: 'Settings',
    icon: IconObjectGear,
    iconActive: IconAnimatedObjectGear,
    href: '#settings',
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
