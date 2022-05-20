<template>
  <button class="border rounded flex outline-none leading-20px text-14px gap-8px items-center"
    :class="[VariantClassesTable[variant], SizeClassesTable[size]]" :disabled="disabled">
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
    size: 'md',
    disabled: false,
  }
);
</script>
