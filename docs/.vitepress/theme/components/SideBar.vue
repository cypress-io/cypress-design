<script lang="ts" setup>
const pages = import.meta.glob('../../../../components/*/*.md', {
  eager: true,
})

const getPageName = (p: string) => {
  const pageParts = p.split('/')
  return pageParts[pageParts.length - 2]
}
</script>

<template>
  <ul>
    <li v-for="(page, p) of pages" :key="p">
      <a :href="`/components/vue/${getPageName(p)}`">{{ getPageName(p) }}</a>
    </li>
  </ul>
</template>
