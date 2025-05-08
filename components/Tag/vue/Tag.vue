<template>
  <span
    :class="[
      CssSize[size],
      CssColor[color][
        (dark
          ? outline
            ? 'dark-outline'
            : 'dark'
          : outline
            ? 'default-outline'
            : 'default') as keyof (typeof CssColor)[typeof color]
      ] || CssColor[color][dark ? 'dark' : 'default'],
      CssShared,
    ]"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { CssColor, CssShared, CssSize } from '@cypress-design/constants-tag'

defineProps<{
  size: keyof typeof CssSize
  color: keyof typeof CssColor
  dark?: boolean
  outline?: boolean
}>()
</script>
