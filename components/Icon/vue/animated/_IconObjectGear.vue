<script lang="ts" setup>
import PathMorpher from './_PathMorpher.vue'
import { iconObjectGear } from '@cypress-design/constants-icon'
import {
  type HasStrokeColor,
  type HasFillColor,
  getComponentAttributes,
} from '@cypress-design/icon-registry'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<
    {
      animated?: boolean
      interactiveColorsOnGroup?: boolean
    } & HasStrokeColor &
      HasFillColor
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
      v-bind="iconObjectGear"
      fill-rule="evenodd"
      clip-rule="evenodd"
      class="icon-light"
      fill="#1B1E2E"
      :animated="animated"
    />
    <circle cx="12" cy="12" r="2" fill="#9095AD" class="icon-dark" />
  </svg>
</template>
