<script lang="ts" setup>
import { computed, h } from 'vue'
import Tabs from '@cypress-design/vue-tabs'
import { Tab } from '@cypress-design/constants-tabs'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'

const props = defineProps<{
  framework: 'vue' | 'react'
  path: string
}>()

const emit = defineEmits<{
  (event: 'switch', framework: 'vue' | 'react'): void
}>()

const links = computed(() => [
  {
    id: 'react',
    label: 'React',
    iconAfter: () => h('img', { width: 24, src: ReactIcon }),
    active: props.framework === 'react',
    ['aria-controls']: 'tabpanel-react',
  },
  {
    id: 'vue',
    label: 'Vue',
    iconAfter: () => h('img', { width: 24, src: VueIcon }),
    active: props.framework === 'vue',
    ['aria-controls']: 'tabpanel-vue',
  },
])
</script>

<template>
  <Tabs
    class="px-[16px]"
    variant="underline-large"
    :tabs="links"
    @switch="(tab: Tab) => emit('switch', tab.id as any)"
  />
  <div id="tabpanel-react" :class="framework === 'react' ? 'block' : 'hidden'">
    React Tab Panel
  </div>
  <div id="tabpanel-vue" :class="framework === 'vue' ? 'block' : 'hidden'">
    Vue Tab Panel
  </div>
</template>
