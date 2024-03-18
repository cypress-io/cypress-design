# Menu

## Install

```bash
npm install @cypress-design/vue-menu
```

or with yarn

```bash
yarn add @cypress-design/vue-menu
```

```vue live
<script setup>
import { ref } from 'vue'
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
</script>
<template>
  <Menu
    :activePath="activePath"
    :items="[
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
    ]"
    @mousedown="
      (e) => {
        // if target is a child of a link, prevent default
        if (e.target.closest('a')) {
          e.preventDefault()
          activePath = `#${e.target.closest('a').href?.split('#')[1]}`
        }
      }
    "
  />
</template>
```
