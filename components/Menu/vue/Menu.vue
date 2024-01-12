<script lang="ts" setup>
import { ref, type DefineComponent, provide } from 'vue'
import { NavGroup, NavItemLink } from '@cypress-design/constants-menu'
import MenuGroupElements from './_MenuGroupElements.vue'

withDefaults(
  defineProps<{
    items: (NavItemLink | NavGroup)[]
    activePath?: string
    collapsible?: boolean
    linkComponent?: DefineComponent | 'a'
  }>(),
  {
    linkComponent: 'a',
    collapsible: true,
    activePath: undefined,
  },
)

const $container = ref<HTMLDivElement>()

const activeTop = ref(0)
const activeHeight = ref(36)
const showMarker = ref(false)

function updateActiveMarkerPosition({ top, height } = { height: 0, top: 0 }) {
  const containerTop = $container.value?.getBoundingClientRect().top || 0
  activeTop.value = top - containerTop
  activeHeight.value = height
  showMarker.value = true
}

const markerIsMoving = ref(false)

provide('transition-is-moving', markerIsMoving)
</script>

<template>
  <div ref="$container" class="relative">
    <div
      v-if="showMarker && collapsible && !markerIsMoving"
      data-cy="menu-active-marker"
      class="absolute h-[36px] w-[4px] z-50 rounded-full bg-indigo-500 transition-all duration-300 ml-[6.5px] mt-[4px]"
      :style="{
        top: `${activeTop}px`,
        height: `${activeHeight - 8}px`,
      }"
    />
    <MenuGroupElements
      :items="items"
      :active-path="activePath"
      :collapsible="collapsible"
      :link-component="linkComponent"
      :depth="-1"
      @update-active-position="updateActiveMarkerPosition"
      @hide-marker="showMarker = false"
    />
  </div>
</template>
