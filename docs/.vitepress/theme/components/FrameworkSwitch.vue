<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  framework: 'vue' | 'react'
  path: string
}>()

const emit = defineEmits<{
  (event: 'switch', framework: 'vue' | 'react'): void
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
  <div class="flex flex-1 justify-center gap-[32px]">
    <a
      v-for="(link, key) in links"
      :key="key"
      @click="emit('switch', key)"
      :href="link.href"
      class="text-gray-700 relative font-secondary block text-[16px] leading-[24px] font-medium my-[8px] bg-gradient-to-r bg-bottom bg-no-repeat duration-300 transition-all"
      :class="{
        'from-gray-300 to-gray-300 bg-[length:100%_2px]': framework === key,
        'hover:from-jade-300 hover:to-jade-300  bg-[length:0_2px] hover:bg-[length:100%_2px]':
          framework !== key,
      }"
    >
      {{ link.name }}
    </a>
  </div>
</template>
