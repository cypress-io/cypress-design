<script lang="ts" setup>
import type { NavMenuGroup, NavMenuItem } from '@cypress-design/constants-menu'
import MenuItem from './_MenuItem.vue'
import type { IconSet } from './interfaces'

interface NavMenuItemWithIcon extends NavMenuItem, IconSet {}

interface NavMenuProps {
  activePath?: string
  items: (NavMenuGroup<NavMenuItemWithIcon> | NavMenuItemWithIcon)[]
}

withDefaults(defineProps<NavMenuProps>(), {
  items: () => [],
})

defineEmits<{
  mousedown: [e: MouseEvent]
}>()
</script>

<template>
  <ul
    v-for="item of items"
    class="bg-gray-1000 text-gray-500"
    @mousedown="(e) => $emit('mousedown', e)"
  >
    <li :key="item.label">
      <template v-if="'items' in item">
        <MenuItem
          v-bind="item"
          :active="item.href !== undefined && item.href === activePath"
        />
        <Menu :items="item.items" :activePath="activePath" />
      </template>
      <MenuItem
        v-else
        v-bind="item"
        :active="item.href !== undefined && item.href === activePath"
      />
    </li>
  </ul>
</template>
