<template>
  <button class="border rounded rounded-4px flex items-center transition duration-150 hocus:ring-2"
    :class="[VariantClassesTable[(disabled && !['secondary', 'link'].includes(variant)) ? 'disabled' : variant], SizeClassesTable[size]]"
    :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { VariantClassesTable, SizeClassesTable } from '../constants';
import type { ButtonSizes, ButtonVariants } from '../constants';


withDefaults(
  defineProps<{
    variant?: ButtonVariants,
    size?: ButtonSizes,
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: '32',
    disabled: false,
  }
);
</script>
