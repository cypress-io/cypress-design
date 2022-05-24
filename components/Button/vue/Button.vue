<template>
  <button :class="[StaticClasses, VariantClassesTable[finalVariant], SizeClassesTable[size]]" :disabled="finalDisabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { VariantClassesTable, SizeClassesTable, StaticClasses } from '../constants';
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

const finalVariant = computed(() => (props.disabled && !['secondary', 'link'].includes(props.variant)) ? 'disabled' : props.variant)
const finalDisabled = computed(() => props.disabled || props.variant === 'disabled');
</script>
