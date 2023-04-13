<script lang="ts" setup>
import type { NavItemLink } from '../constants'

withDefaults(
  defineProps<{
    item: NavItemLink
    depth?: number
    collapsible: boolean
  }>(),
  {
    depth: -1,
  }
)
</script>

<template>
  <li
    class="list-none p-0"
    :class="{
      'pl-[16px]': depth >= 0,
    }"
  >
    <a
      class="group relative block w-full pl-[24px]"
      :class="{
        'text-indigo-500 dark:text-indigo-200': item.active,
        'py-[8px] text-[16px] leading-[24px]': depth < 0,
        'leading-[20px] text-[14px] py-[12px]': depth >= 0,
      }"
      :href="item.href"
    >
      <div
        v-if="depth >= 0"
        class="absolute h-[80%] top-[10%] w-[4px] z-10 rounded-full hidden"
        :class="{
          'group-hover:block bg-gray-300': !item.active && collapsible,
        }"
        :style="{
          left: `-${18.5 + depth * 7.5}px`,
        }"
      />
      {{ item.text }}
    </a>
  </li>
</template>
