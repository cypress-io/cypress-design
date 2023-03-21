<script lang="ts" setup>
import { ref } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '../constants'
import DocLink from './_DocLink.vue'
import DocMenu from './DocMenu.vue'

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
    class="flex leading-[24px] py-[8px] items-center relative w-full"
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
      <DocLink v-if="'href' in item" :item="item" :depth="depth" />
      <li v-else>
        <DocGroup :group="item" :depth="depth + 1" />
      </li>
    </template>
  </ul>
</template>
