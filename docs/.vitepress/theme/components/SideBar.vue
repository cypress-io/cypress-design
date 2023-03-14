<script lang="ts" setup>
import { IconChevronDownSmall } from '@cypress-design/vue-icon'

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
    <li>
      <span class="flex items-center">
        <IconChevronDownSmall class="mx-2" />Components
      </span>
      <ul class="pl-10">
        <li v-for="(page, p) of pages[framework]" :key="p">
          <a :href="p.replace(/\.md$/, '')">{{ getPageName(p) }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>
