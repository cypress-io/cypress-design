<script lang="ts" setup>
import { computed } from 'vue'

const docsPages = import.meta.glob('../../../*.md', {
  eager: true,
})

const items = computed(() =>
  Object.keys(docsPages)
    .map((p) => {
      const route = p.replace(/^\.\.\/\.\.\/\.\./, '').replace(/\.md$/, '')

      return {
        text: route.split('/').pop()?.replace(/-/g, ' ') ?? '',
        href: route,
        active: props.routePath.includes(route),
      }
    })
    .filter((p) => p.text.toLowerCase() !== 'index')
)

const props = defineProps<{
  routePath: string
}>()
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.href" class="pl-[32px]">
      <a
        :href="item.href"
        class="font-medium group relative inline-block py-[12px] leading-[24px] text-[16px] pl-[24px]"
        :class="{
          'text-indigo-500': item.active,
        }"
        >{{ item.text }}</a
      >
    </li>
  </ul>
</template>
