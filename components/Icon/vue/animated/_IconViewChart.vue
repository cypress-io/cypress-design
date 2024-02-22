<script lang="ts" setup>
import { iconViewChart } from '@cypress-design/constants-icon'
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
      v-bind="iconViewChart.topRight"
      fill="#AFB3C7"
      class="icon-light"
      :animated="animated"
    />
    <PathMorpher
      v-bind="iconViewChart.left"
      fill="#747994"
      class="icon-dark-secondary"
      :animated="animated"
    />
    <PathMorpher
      v-bind="iconViewChart.bottom"
      fill="#1B1E2E"
      class="icon-dark"
      :animated="animated"
      shapeRendering="geometricPrecision"
    />
  </svg>
</template>
