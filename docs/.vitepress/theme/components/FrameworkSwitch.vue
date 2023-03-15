<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  framework: 'vue' | 'react'
  path: string
}>()

const links = computed(() => ({
  react: {
    href: props.path.replace(/\/vue\//, '/react/'),
    name: 'React',
  },
  vue: {
    href: props.path.replace(/\/react\//, '/vue/'),
    name: 'Vue',
  },
}))
</script>

<template>
  <div class="flex flex-1 justify-center">
    <a
      v-for="(link, key) in links"
      :key="key"
      :href="link.href"
      class="p-4"
      :class="{
        'text-gray-400': framework === key,
        'text-gray-800': framework !== key,
      }"
    >
      {{ link.name }}
    </a>
  </div>
</template>
