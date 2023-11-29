<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'
import { computed } from 'vue'
import { getDocsPages } from '../utils/docsPages'
import { getPatternPages } from '../utils/patternPages'

const pages = {
  vue: import.meta.glob('../../../components/*/vue/*.md', { eager: true }),
  react: import.meta.glob('../../../components/*/react/*.md', { eager: true }),
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

const components = computed(() => {
  return {
    text: 'Components',
    items: Object.keys(pages[props.framework]).reduce(
      (acc: { text: string; href: string; active: boolean }[], p) => {
        const href = p.replace(/\.md$/, '').replace(/\/(vue|react)/, '')
        if (acc.some(({ href: hrefAcc }) => hrefAcc === href)) return acc
        acc.push({
          text: getPageName(p),
          href,
          active:
            props.currentPath.length > 1 &&
            p.replace(/\/(vue|react)/, '').includes(props.currentPath),
        })
        return acc
      },
      [],
    ),
  }
})

const { items: patterns } = getPatternPages(rp)

const patternGroup = computed(() => {
  return {
    text: 'Patterns',
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
