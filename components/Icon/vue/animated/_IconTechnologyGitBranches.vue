<script lang="ts" setup>
import { iconTechnologyGitBranches } from '@cypress-design/constants-icon'
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
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <PathMorpher
      v-bind="iconTechnologyGitBranches.left"
      fill="#1B1E2E"
      class="icon-light"
      :animated="animated"
    />
    <PathMorpher
      v-bind="iconTechnologyGitBranches.right"
      fill="#747994"
      class="icon-dark"
      :animated="animated"
    />
  </svg>
</template>
