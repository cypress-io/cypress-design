<script lang="ts" setup>
import PathMorpher from './_PathMorpher.vue'
import { iconAnimatedGeneralChatBubble } from '@cypress-design/icon-registry'
import {
  getComponentAttributes,
  type HasStrokeColor,
  type HasFillColor,
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
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    :class="compiledClasses"
  >
    <PathMorpher
      class="icon-dark"
      fill="#1B1E2E"
      v-bind="iconAnimatedGeneralChatBubble.small"
      :animated="animated"
    />
    <PathMorpher
      class="icon-light"
      fill="#1B1E2E"
      v-bind="iconAnimatedGeneralChatBubble.big"
      :animated="animated"
    />
  </svg>
</template>
