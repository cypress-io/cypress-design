<script lang="ts" setup>
import type {
  Size,
  statusTypes,
  Variant,
} from '@cypress-design/constants-statusicon'
import OutlineStatusIcon from './_OutlineStatusIcon'
import SimpleStatusIcon from './_SimpleStatusIcon'
import SolidStatusIcon from './_SolidStatusIcon'

withDefaults(
  defineProps<{
    /**
     * The size of the icon's canvas, in pixels.
     */
    size?: Size
    /**
     * If there is no status provided, a placeholder icon will be shown
     */
    status?: statusTypes
    /**
     * If a status doesn't have an icon for that variant, it will default to one it does have
     */
    variant?: Variant
  }>(),
  {
    size: '24',
    status: 'placeholder',
    variant: 'simple',
  }
)
</script>

<template>
  <OutlineStatusIcon
    v-if="variant === 'outline'"
    :size="size"
    :status="status"
  />
  <SimpleStatusIcon
    v-else-if="variant === 'simple'"
    :size="size"
    :status="status"
  />
  <SolidStatusIcon v-else :size="size" :status="status" />
</template>
