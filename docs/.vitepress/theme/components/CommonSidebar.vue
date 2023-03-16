<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'

const docsPages = import.meta.glob('../../../*.md', {
  eager: true,
})

const items = Object.keys(docsPages)
  .map((p) => {
    const route = p.replace(/^\.\.\/\.\.\/\.\.\//, '').replace(/\.md$/, '')
    const name = route.split('/').pop() ?? ''
    return {
      text: name,
      href: route,
      active: route.includes(props.routePath),
    }
  })
  .filter((p) => p.text.toLowerCase() !== 'index')

const props = defineProps<{
  routePath: string
}>()
</script>

<template>
  <DocMenu :group="{ items }" />
</template>
