<script lang="ts" setup>
import { computed, h } from 'vue'
import Tabs from '@cypress-design/vue-tabs'
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
  },
  {
    id: 'vue',
    label: 'Vue',
    iconAfter: () => h('img', { width: 24, src: VueIcon }),
    active: props.framework === 'vue',
  },
])
</script>

<template>
  <Tabs
    class="px-[16px]"
    type="underline-large"
    :tabs="links"
    @change="(tab) => emit('switch', tab.id as any)"
  />
</template>
