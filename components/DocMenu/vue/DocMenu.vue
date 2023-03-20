<script lang="ts" setup>
import { ref } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '../constants'

const props = withDefaults(
  defineProps<{
    group: NavGroup
    depth?: number
  }>(),
  {
    depth: 0,
  }
)

const open = ref(props.depth === 0)
</script>

<template>
  <button
    v-if="group.text"
    @click="open = !open"
    class="flex leading-[24px] py-[8px] items-center relative"
    :class="[
      classes.button,
      {
        [classes.topButton]: depth === 0,
        [classes.leafButton]: depth,
      },
    ]"
  >
    <IconChevronDownSmall
      stroke-color="gray-400"
      :size="depth ? '8' : '16'"
      class="absolute left-0 transform transition-transform"
      :class="{
        'rotate-0': open,
        '-rotate-90': !open,
        'ml-[16px]': depth,
      }"
    />
    {{ group.text }}
  </button>
  <ul
    v-show="open"
    class="ml-[7px]"
    :class="{
      'border-l border-gray-100': depth === 0,
    }"
  >
    <template v-for="item in group.items">
      <li v-if="'href' in item" class="pl-[16px]">
        <a
          class="group relative inline-block py-[12px] leading-[20px] text-[14px] pl-[24px]"
          :class="{
            'text-indigo-500': item.active,
          }"
          :href="item.href"
        >
          <div
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
      <li v-else>
        <DocMenu :group="item" :depth="depth + 1" />
      </li>
    </template>
  </ul>
</template>