<script lang="ts" setup>
import PathMorpher from './_PathMorpher.vue'
import {
  type HasStrokeColor,
  type HasFillColor,
  type HasSecondaryStrokeColor,
  getComponentAttributes,
  iconAnimatedViewChart,
} from '@cypress-design/icon-registry'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<
    {
      animated?: boolean
      interactiveColorsOnGroup?: boolean
    } & HasStrokeColor &
      HasFillColor &
      HasSecondaryStrokeColor
  >(),
  {
    animated: false,
  },
)

const compiledClasses = computed(
  () =>
    getComponentAttributes({
      ...props,
      availableSizes: ['24'],
      interactiveColorsOnGroup: props.interactiveColorsOnGroup,
    }).compiledClasses,
)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="compiledClasses"
  >
    <PathMorpher
      v-bind="iconAnimatedViewChart.topRight"
      fill="#AFB3C7"
      class="icon-light"
      :animated="animated"
    />
    <PathMorpher
      v-bind="iconAnimatedViewChart.left"
      fill="#747994"
      class="icon-dark-secondary"
      :animated="animated"
    />
    <PathMorpher
      v-bind="iconAnimatedViewChart.bottom"
      fill="#1B1E2E"
      class="icon-dark"
      :animated="animated"
      shapeRendering="geometricPrecision"
    />
  </svg>
</template>
