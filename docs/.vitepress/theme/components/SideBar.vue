<script lang="ts" setup>
const pages = {
  vue: import.meta.glob('../../../components/vue/*.md', {
    eager: true,
  }),
  react: import.meta.glob('../../../components/react/*.md', {
    eager: true,
  }),
}

const getPageName = (p: string) => {
  return p.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

defineProps<{
  framework: 'vue' | 'react'
}>()
</script>

<template>
  <ul>
    <li v-for="(page, p) of pages[framework]" :key="p">
      <a :href="p.replace(/\.md$/, '')">{{ getPageName(p) }}</a>
    </li>
  </ul>
</template>
