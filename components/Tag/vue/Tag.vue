<template>
  <span
    :class="[
      SizeClasses[size],
      ColorClasses[color][dark ? 'dark' : 'default'],
      SharedSettings.classes,
    ]"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { ColorClasses, SharedSettings, SizeClasses } from '../constants'

defineProps<{
  size: keyof typeof SizeClasses
  color: keyof typeof ColorClasses
  dark?: boolean
}>()
</script>
