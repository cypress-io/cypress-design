<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'
import { computed } from 'vue'

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

const docsPages = import.meta.glob('../../../*.md', {
  eager: true,
})

const items = computed(() =>
  Object.keys(docsPages)
    .map((p) => {
      const route = p.replace(/^\.\.\/\.\.\/\.\./, '').replace(/\.md$/, '')

      return {
        text:
          route
            .split('/')
            .pop()
            ?.replace(/^\d+-(\w)/g, '$1')
            .replace(/-/g, ' ') ?? '',
        href: route,
        active: props.routePath.includes(route),
      }
    })
    .filter((p) => p.text.toLowerCase() !== 'index')
)

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
