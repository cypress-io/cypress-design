<script lang="ts" setup>
import DocMenu, { NavGroup } from '@cypress-design/vue-docmenu'
import { computed } from 'vue'
import { getDocsPages } from '../utils/docsPages'
import { getPatternPages } from '../utils/patternPages'

const pages = {
  vue: import.meta.glob('../../../components/vue/*.md'),
  react: import.meta.glob('../../../components/react/*.md'),
}

const getPageName = (p: string) => {
  return p.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

const props = defineProps<{
  framework: 'vue' | 'react'
  currentPath: string
  routePath: string
}>()

const rp = computed(() => props.routePath)

const { items: docsPages } = getDocsPages(rp)

const components = computed<NavGroup>(() => {
  return {
    label: 'Components',
    items: Object.keys(pages[props.framework]).map((p) => {
      return {
        label: getPageName(p),
        href: p.replace(/\.md$/, ''),
        active:
          props.currentPath.length > 1 &&
          p.replace(/\/(vue|react)/, '').includes(props.currentPath),
      }
    }),
  }
})

const { items: patterns } = getPatternPages(rp)

const patternGroup = computed<NavGroup>(() => {
  return {
    label: 'Patterns',
    items: patterns.value,
  }
})
</script>

<template>
  <DocMenu
    :items="[...docsPages, components, patternGroup]"
    class="pl-[16px] md:py-[16px] w-[250px]"
  />
</template>
