<template>
  <span
    :class="[SharedSettings.classes, ColorClasses[color], SizeClasses[size]]"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { ColorClasses, SharedSettings, SizeClasses } from '../constants'

defineProps<{
  size: keyof typeof SizeClasses
  color: keyof typeof ColorClasses
}>()
</script>
