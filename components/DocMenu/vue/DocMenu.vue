<script lang="ts" setup>
import { NavGroup, NavItemLink } from '../constants'
import DocGroup from './_DocGroup.vue'
import DocLink from './_DocLink.vue'

withDefaults(
  defineProps<{
    items: (NavItemLink | NavGroup)[]
    collapsible?: boolean
  }>(),
  {
    collapsible: true,
  }
)
</script>

<template>
  <ul class="overflow-y-hidden list-none p-0">
    <template v-for="item in items">
      <li v-if="'items' in item" class="relative list-none p-0">
        <DocGroup :group="item" :depth="0" :collapsible="collapsible" />
      </li>
      <DocLink v-else :item="item" :collapsible="collapsible" />
    </template>
  </ul>
</template>
