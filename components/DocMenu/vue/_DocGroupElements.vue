<script lang="ts" setup>
import { DefineComponent, ref } from 'vue'
import { NavGroup, NavItemLink } from '@cypress-design/constants-docmenu'
import DocGroup from './_DocGroup.vue'
import DocLink from './_DocLink.vue'

const props = defineProps<{
  items: (NavGroup | NavItemLink)[]
  activePath?: string
  collapsible: boolean
  linkComponent: DefineComponent | 'a'
  depth: number
}>()

const emit = defineEmits<{
  (event: 'updateActivePosition', opts?: { top: number; height: number }): void
  (event: 'hideMarker'): void
  (event: 'updateMarkerPosition'): void
}>()

const $items = ref<(typeof DocLink)[]>([])
const $groups = ref<(typeof DocGroup)[]>([])

function hasActiveItemRecursively(items = props.items): boolean {
  return items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items)
    }
    return item.href === props.activePath
  })
}

function reTriggerSetActiveGroup() {
  $items.value.forEach((item) => {
    item.setActiveMarkerPosition()
  })
  $groups.value.forEach((group) => {
    group.reTriggerSetActiveGroup()
  })
}

defineExpose({
  reTriggerSetActiveGroup,
})
</script>

<template>
  <ul
    class="list-none p-0"
    :class="{
      'border-l border-gray-100': depth === 0 && collapsible,
      'ml-[8px]': depth >= 0,
    }"
  >
    <template v-for="item in items">
      <li class="relative list-none p-0" v-if="item && 'items' in item">
        <DocGroup
          ref="$groups"
          :active-path="activePath"
          :group="item"
          :depth="depth + 1"
          :collapsible="collapsible"
          :link-component="linkComponent"
          @update-active-position="
            (opts) => {
              emit('updateActivePosition', opts)
            }
          "
          @update-marker-position="
            () => {
              if (hasActiveItemRecursively()) {
                reTriggerSetActiveGroup()
              } else {
                emit('updateMarkerPosition')
              }
            }
          "
        />
      </li>
      <DocLink
        v-else
        ref="$items"
        :item="item"
        :active="item.href === activePath"
        :depth="depth"
        :collapsible="collapsible"
        :link-component="linkComponent"
        @update:active="
          (_, opts) => {
            if (!opts) return
            emit('updateActivePosition', opts)
          }
        "
      />
    </template>
  </ul>
</template>
