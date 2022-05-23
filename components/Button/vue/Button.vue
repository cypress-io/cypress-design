<template>
  <button
    class="border rounded rounded-4px flex items-center transition duration-150 not-disabled:hocus:ring-2 cursor-not-allowed not-disabled:cursor-pointer"
    :class="[VariantClassesTable[(disabled && !['secondary', 'link'].includes(variant)) ? 'disabled' : variant], SizeClassesTable[size]]"
    :disabled="finalDisabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { VariantClassesTable, SizeClassesTable } from '../constants';
import type { ButtonSizes, ButtonVariants } from '../constants';


const props = withDefaults(
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

const finalDisabled = computed(() => props.disabled || props.variant === 'disabled');
</script>
