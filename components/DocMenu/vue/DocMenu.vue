<script lang="ts" setup>
import { NavGroup, NavItemLink, classes } from '../constants'
import DocGroup from './_DocGroup.vue'
import DocLink from './_DocLink.vue'

defineProps<{
  items: (NavItemLink | NavGroup)[]
}>()
</script>

<template>
  <ul :class="classes.docMenu">
    <template v-for="item in items">
      <DocLink v-if="'href' in item" :item="item" />
      <li v-else class="relative">
        <DocGroup :group="item" :depth="0" />
      </li>
    </template>
  </ul>
</template>
