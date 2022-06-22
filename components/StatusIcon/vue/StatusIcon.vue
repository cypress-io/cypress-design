<template>
  <img
    class="inline-block"
    :class="{ 'animate-spin': statusInfo.iconSpin && size !== '4' }"
    :src="`../img/${statusInfo.iconName}-${getDisplayVariant(
      statusInfo,
      props.size,
      props.variant
    )}_x${props.size}.svg`"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getDisplayVariant, statuses } from '../constants'
import type { Size, Variant } from '../constants'

const props = withDefaults(
  defineProps<{
    size?: Size
    /**
    If there is no status provided, a placeholder icon will be shown
  */
    status?: keyof typeof statuses | null | undefined
    /**
     * If a status doesn't have an icon for that variant, it will default to one it does have
     */
    variant?: Variant
  }>(),
  {
    size: '24',
    status: undefined,
    variant: 'simple',
  }
)

const statusInfo = computed(() =>
  props.status ? statuses[props.status] : statuses.placeholder
)
</script>
