<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'
import { computed } from 'vue'
import { getDocsPages } from '../utils/docsPages'

const pages = {
  vue: import.meta.glob('../../../components/vue/*.md', {
    eager: true,
  }) as any,
  react: import.meta.glob('../../../components/react/*.md', {
    eager: true,
  }) as any,
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

const { items } = getDocsPages(rp)

const group = computed(() => {
  return {
    text: 'Components',
    items: Object.keys(pages[props.framework]).map((p) => {
      return {
        text: getPageName(p),
        href: p.replace(/\.md$/, ''),
        active:
          props.currentPath.length > 1 &&
          p.replace(/\/(vue|react)/, '').includes(props.currentPath),
      }
    }),
  }
})
</script>

<template>
  <DocMenu
    :items="[...items, group]"
    class="pl-[16px] md:py-[16px] w-[250px]"
  />
</template>
