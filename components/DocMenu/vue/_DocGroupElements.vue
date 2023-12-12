<script lang="ts">
export function hasActiveItemRecursively(
  items: (NavGroup | NavItemLink)[],
  activePath?: string,
): boolean {
  return items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items, activePath)
    }
    return item.href === activePath
  })
}

export interface DocGroupEventsEmitted {
  /**
   * If the group is not collapsed, this event will emit the
   * active marker position all the way to the menu component
   */
  (event: 'updateActivePosition', opts?: { top: number; height: number }): void
  /**
   * This event will trigger a re-render of the active marker
   * to update its position if not in the current subtree
   */
  (event: 'updateMarkerPosition'): void
  /**
   * This event will bubble-up and hide the active marker
   */
  (event: 'hideMarker'): void
}
</script>

<script lang="ts" setup>
import { DefineComponent, computed, ref } from 'vue'
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

const emit = defineEmits<DocGroupEventsEmitted>()

const $items = ref<(typeof DocLink)[]>([])
const $groups = ref<(typeof DocGroup)[]>([])

const hasActiveItem = computed(() =>
  props.items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items, props.activePath)
    }
    return item.href === props.activePath
  }),
)

/**
 * update the position of the marker when opening a group
 * @param index
 */
function reTriggerSetActiveGroup(index = -1) {
  $items.value.forEach((item) => {
    item.setActiveMarkerPosition()
  })
  // only update groups that come after the toggled one
  // others will not need to update the marker
  // since they are "before" in the rendering tree
  $groups.value.slice(index).forEach((group) => {
    group.reTriggerSetActiveGroup()
  })
}

defineExpose({
  reTriggerSetActiveGroup,
})
</script>

<template>
  <ul class="list-none p-0">
    <template v-for="(item, index) in items">
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
              if (hasActiveItem) {
                reTriggerSetActiveGroup(index)
              } else {
                emit('updateMarkerPosition')
              }
            }
          "
          @hide-marker="emit('hideMarker')"
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
            if (!opts || depth < 0) return
            emit('updateActivePosition', opts)
          }
        "
      />
    </template>
  </ul>
</template>
