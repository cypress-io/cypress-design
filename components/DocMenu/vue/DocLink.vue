<script lang="ts" setup>
import type { NavItemLink } from '../constants'

withDefaults(
  defineProps<{
    item: NavItemLink
    depth?: number
  }>(),
  {
    depth: -1,
  }
)
</script>

<template>
  <li
    :class="{
      'pl-[16px]': depth >= 0,
    }"
  >
    <a
      class="group relative block w-full pl-[24px]"
      :class="{
        'text-indigo-500': item.active,
        'py-[8px] text-[16px] leading-[24px]': depth < 0,
        'leading-[20px] text-[14px] py-[12px]': depth >= 0,
      }"
      :href="item.href"
    >
      <div
        v-if="depth >= 0"
        class="absolute h-[90%] top-[5%] w-[4px] z-10 rounded-full"
        :class="{
          'left-[-18.5px]': depth === 0,
          'left-[-25.5px]': depth > 0,
          'hidden group-hover:block bg-gray-300': !item.active,
          'bg-indigo-500': item.active,
        }"
      />
      {{ item.text }}
    </a>
  </li>
</template>
