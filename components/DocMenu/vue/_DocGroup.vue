<script lang="ts" setup>
import { computed, Ref, ref } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '../constants'
import DocLink from './_DocLink.vue'
import DocGroup from './_DocGroup.vue'

const props = withDefaults(
  defineProps<{
    group: NavGroup
    depth?: number
  }>(),
  {
    depth: 0,
  }
)

const $groups = ref<(typeof DocGroup)[]>([])

const height = computed(() => {
  return $groups.value && open.value
    ? $groups.value.reduce(
        (acc, { height: h }) => acc + h,
        props.group.items.length
      )
    : 0
})

const open = ref(props.depth === 0)

const activeIndex = computed(() => {
  const index = props.group.items.findIndex(
    (item) => 'href' in item && item.active
  )
  return index
})

// get the number of groups to analyze
const numberOfGroups = computed(() => {
  return props.group.items.filter(
    (item, index) => !('href' in item) && index < activeIndex.value
  ).length
})

const topDiscreet = computed(() => {
  let _numberOfGroups = numberOfGroups.value
  // if there is any open group before the active element
  // compensate for the height
  const groupHeight = $groups.value?.reduce((acc, group) => {
    if (_numberOfGroups < -1) return acc
    _numberOfGroups--
    return acc + group.height
  }, 0)

  return activeIndex.value + groupHeight
})

const top = computed(() => {
  return topDiscreet.value * 44 + 48
})

defineExpose<{
  height: Ref<number>
}>({
  height,
})
</script>

<template>
  <button
    v-if="group.text"
    @click="open = !open"
    class="flex leading-[24px] py-[10px] items-center relative w-full"
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
  <div
    v-if="
      depth >= 0 &&
      open &&
      group.items.some((item) => 'href' in item && item.active)
    "
    class="absolute h-[36px] w-[4px] z-10 rounded-full bg-indigo-500 transition-all duration-300 ml-[6px]"
    :style="{
      top: `${top}px`,
      left: `-${depth === 0 ? 0 : depth * 7.5 + 1}px`,
    }"
  />
  <ul
    v-show="open"
    class="ml-[7.5px]"
    :class="{
      'border-l border-gray-100': depth === 0,
    }"
  >
    <template v-for="item in group.items">
      <DocLink v-if="'href' in item" :item="item" :depth="depth" />
      <li class="relative" v-else>
        <DocGroup ref="$groups" :group="item" :depth="depth + 1" />
      </li>
    </template>
  </ul>
</template>
