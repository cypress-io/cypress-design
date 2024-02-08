<template>
  <ul class="bg-jade-100">
    <li v-for="item in items" :key="item.label" class="p-2">
      <template v-if="'items' in item">
        <span>{{ item.label }}</span>
        <Menu :items="item.items" />
      </template>
      <a v-else :href="item.href">
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { DefineComponent } from 'vue'
import { NavMenuGroup, NavMenuItem } from '@cypress-design/constants-menu'

interface NavMenuItemWithIcon extends NavMenuItem {
  icon?: DefineComponent
}

interface NavMenuProps {
  items: (NavMenuGroup<NavMenuItemWithIcon> | NavMenuItemWithIcon)[]
}

withDefaults(defineProps<NavMenuProps>(), {
  items: () => [],
})
</script>
