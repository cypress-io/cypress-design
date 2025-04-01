<script lang="ts" setup>
import type {
  NavMenuGroup,
  NavMenuItem,
  DataAttributes,
} from '@cypress-design/constants-menu'
import MenuItem from './_MenuItem.vue'
import type { IconSet } from './interfaces'

interface NavMenuItemWithIcon extends NavMenuItem, IconSet {
  anchorAttributes?: Partial<HTMLAnchorElement> & DataAttributes
}

interface NavMenuGroupWithExtras extends NavMenuGroup<NavMenuItemWithIcon> {
  submenuClassName?: string
}

interface NavMenuProps {
  items: (NavMenuGroupWithExtras | NavMenuItemWithIcon)[]
  activePath?: string
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
    :key="item.key || item.label"
    :class="[
      'bg-gray-1000 text-gray-500',
      'items' in item ? item.submenuClassName : null,
    ]"
    @mousedown="(e) => $emit('mousedown', e)"
  >
    <li :key="item.key || item.label" :class="item.className">
      <template v-if="'items' in item">
        <MenuItem
          v-bind="item"
          :active="item.href !== undefined && item.href === activePath"
        />
        <Menu :items="item.items" :activePath="activePath" />
      </template>
      <template v-else>
        <MenuItem
          v-bind="item"
          :active="item.href !== undefined && item.href === activePath"
        />
      </template>
    </li>
  </ul>
</template>
