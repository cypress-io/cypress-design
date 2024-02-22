<script lang="ts" setup>
import { iconTechnologyServer } from '@cypress-design/constants-icon'
import PathMorpher from './_PathMorpher.vue'

withDefaults(
  defineProps<{
    animated?: boolean
  }>(),
  {
    animated: false,
  },
)
</script>

<template>
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <PathMorpher
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-bind="iconTechnologyServer.top"
      :animated="animated"
      fill="#1B1E2E"
      class="icon-light"
    />
    <PathMorpher
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-bind="iconTechnologyServer.middle"
      :animated="animated"
      fill="#9095AD"
      class="icon-dark"
    />

    <PathMorpher
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-bind="iconTechnologyServer.bottom"
      :animated="animated"
      fill="#9095AD"
      class="icon-dark"
    />
  </svg>
</template>
