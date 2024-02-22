<script lang="ts" setup>
import PathMorpher from './_PathMorpher.vue'
import { iconGeneralChatBubble } from '@cypress-design/constants-icon'

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
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <PathMorpher
      class="icon-dark"
      fill="#1B1E2E"
      v-bind="iconGeneralChatBubble.small"
      :animated="animated"
    />
    <PathMorpher
      class="icon-light"
      fill="#1B1E2E"
      v-bind="iconGeneralChatBubble.big"
      :animated="animated"
    />
  </svg>
</template>
