<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import { NavGroup, NavItemLink } from '@cypress-design/constants-docmenu'
import DocGroup from './_DocGroup.vue'
import DocLink from './_DocLink.vue'

withDefaults(
  defineProps<{
    items: (NavItemLink | NavGroup)[]
    collapsible?: boolean
    linkComponent?: DefineComponent | 'a'
  }>(),
  {
    linkComponent: 'a',
    collapsible: true,
  },
)
</script>

<template>
  <ul class="overflow-y-hidden list-none p-0">
    <template v-for="item in items">
      <li v-if="'items' in item" class="relative list-none p-0">
        <DocGroup
          :group="item"
          :depth="0"
          :collapsible="collapsible"
          :link-component="linkComponent"
        />
      </li>
      <DocLink
        v-else
        :item="item"
        :collapsible="collapsible"
        :link-component="linkComponent"
      />
    </template>
  </ul>
</template>
