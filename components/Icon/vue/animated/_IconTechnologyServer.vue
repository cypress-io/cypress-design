<script lang="ts" setup>
import PathMorpher from './_PathMorpher.vue'
import {
  type HasStrokeColor,
  type HasFillColor,
  getComponentAttributes,
  iconAnimatedTechnologyServer,
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
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    :class="compiledClasses"
  >
    <PathMorpher
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-bind="iconAnimatedTechnologyServer.top"
      :animated="animated"
      fill="#1B1E2E"
      class="icon-light"
    />
    <PathMorpher
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-bind="iconAnimatedTechnologyServer.middle"
      :animated="animated"
      fill="#9095AD"
      class="icon-dark"
    />

    <PathMorpher
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-bind="iconAnimatedTechnologyServer.bottom"
      :animated="animated"
      fill="#9095AD"
      class="icon-dark"
    />
  </svg>
</template>
