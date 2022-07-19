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

<script lang="ts" setup>
// @ts-ignore
import type { statusTypes } from '../constants'
import OutlineStatusIcon from './OutlineStatusIcon'
import SimpleStatusIcon from './SimpleStatusIcon'
import SolidStatusIcon from './SolidStatusIcon'

const props = withDefaults(
  defineProps<{
    size?: '4' | '8' | '12' | '16' | '24'
    /**
    If there is no status provided, a placeholder icon will be shown
  */
    status?: statusTypes | null | undefined
    /**
     * If a status doesn't have an icon for that variant, it will default to one it does have
     */
    variant?: 'outline' | 'simple' | 'solid'
  }>(),
  {
    size: '24',
    status: undefined,
    variant: 'simple',
  }
)
</script>
