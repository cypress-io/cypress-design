<script lang="ts" setup>
import { ref, type DefineComponent } from 'vue'
import { NavGroup, NavItemLink } from '@cypress-design/constants-docmenu'
import DocGroup from './_DocGroup.vue'
import DocLink from './_DocLink.vue'

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
    activePath: '<unknown>',
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
</script>

<template>
  <div ref="$container" class="relative">
    <div
      v-if="showMarker"
      data-cy="doc-menu-active-marker"
      class="absolute h-[36px] w-[4px] z-50 rounded-full bg-indigo-500 transition-all duration-300 ml-[6px] mt-[4px]"
      :style="{
        top: `${activeTop + 4}px`,
        height: `${activeHeight - 8}px`,
      }"
    />
    <ul class="overflow-y-hidden list-none p-0">
      <template v-for="item in items">
        <li v-if="'items' in item" class="relative list-none p-0">
          <DocGroup
            :group="item"
            :active-path="activePath ?? ''"
            :depth="0"
            :collapsible="collapsible"
            :link-component="linkComponent"
            @update-active-position="updateActiveMarkerPosition"
          />
        </li>
        <DocLink
          v-else
          :item="item"
          :active="item.href === activePath"
          :collapsible="collapsible"
          :link-component="linkComponent"
          @update:active="
            (active) => {
              if (active) {
                showMarker = false
              }
            }
          "
        />
      </template>
    </ul>
  </div>
</template>
