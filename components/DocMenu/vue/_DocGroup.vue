<script lang="ts" setup>
import { computed, Ref, ref } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '../constants'
import DocLink from './_DocLink.vue'
import DocGroup from './_DocGroup.vue'

const props = withDefaults(
  defineProps<{
    group: NavGroup
    collapsible: boolean
    depth?: number
  }>(),
  {
    depth: 0,
  }
)

const open = ref(props.depth === 0)

const $groups = ref<(typeof DocGroup)[]>([])

const height = computed(() => {
  return $groups.value && open.value
    ? $groups.value.reduce(
        (acc, { height: h }) => acc + h,
        props.group.items.length
      )
    : 0
})

defineExpose<{
  height: Ref<number>
}>({
  height,
})

const activeMarkerTop = computed(() => {
  const activeIndex = props.group.items.findIndex(
    (item) => 'href' in item && item.active
  )

  // how many groups are before the active element?
  let numberOfGroups = props.group.items.filter(
    (item, index) => !('href' in item) && index < activeIndex
  ).length

  // if there is any open group before the active element
  // compensate for the height
  const groupHeight = $groups.value?.reduce((acc, group) => {
    if (numberOfGroups < -1) return acc
    numberOfGroups--
    return acc + group.height
  }, 0)
  return (activeIndex + groupHeight) * 44
})
</script>

<template>
  <button
    v-if="group.text"
    @click="
      () => {
        if (collapsible) {
          open = !open
        }
      }
    "
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
      collapsible &&
      depth >= 0 &&
      open &&
      group.items.some((item) => 'href' in item && item.active)
    "
    class="absolute h-[36px] w-[4px] z-10 rounded-full bg-indigo-500 transition-all duration-300 ml-[6px] mt-[48px]"
    :style="{
      top: `${activeMarkerTop}px`,
      left: `-${depth === 0 ? 0 : depth * 7.5 + 1}px`,
    }"
  />
  <ul
    v-show="open"
    class="ml-[7.5px]"
    :class="{
      'border-l border-gray-100': depth === 0 && collapsible,
    }"
  >
    <template v-for="item in group.items">
      <li class="relative" v-if="'items' in item">
        <DocGroup
          ref="$groups"
          :group="item"
          :depth="depth + 1"
          :collapsible="collapsible"
        />
      </li>
      <DocLink v-else :item="item" :depth="depth" />
    </template>
  </ul>
</template>
