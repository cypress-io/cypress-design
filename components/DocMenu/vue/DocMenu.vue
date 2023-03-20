<script lang="ts" setup>
import type { NavGroup, NavItemLink } from '../constants'
import DocGroup from './DocGroup.vue'
import DocLink from './DocLink.vue'

defineProps<{
  items: (NavItemLink | NavGroup)[]
}>()
</script>

<template>
  <ul class="pl-[16px] py-[16px]">
    <template v-for="item in items">
      <DocLink v-if="'href' in item" :item="item" />
      <li v-else>
        <DocGroup :group="item" :depth="0" />
      </li>
    </template>
  </ul>
</template>
