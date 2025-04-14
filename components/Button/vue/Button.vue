<script lang="ts">
import { PropType, SlotsType, computed, defineComponent } from 'vue'
import {
  DefaultSize,
  DefaultVariant,
  CssVariantClassesTable,
  CssSizeClassesTable,
  CssStaticClasses,
  CssSizeClassesTableSquare,
} from '@cypress-design/constants-button'

import type { ButtonProps } from '@cypress-design/constants-button'
import { useDisabledVariant } from './useDisabledVariant'

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<NonNullable<ButtonProps['variant']>>,
      default: DefaultVariant,
    },
    size: {
      type: String as PropType<NonNullable<ButtonProps['size']>>,
      default: DefaultSize,
    },
    disabled: {
      type: Boolean as PropType<ButtonProps['disabled']>,
      default: false,
    },
    href: {
      type: String as PropType<ButtonProps['href']>,
    },
    type: {
      type: String as PropType<ButtonProps['type']>,
      default: 'button',
    },
    square: {
      type: Boolean as PropType<ButtonProps['square']>,
      default: false,
    },
  },
  emits: {
    click($event: MouseEvent) {
      return !!$event
    },
  },
  slots: Object as SlotsType<{
    /**
     * The content of the button
     */
    default: void
  }>,
  setup(props) {
    const finalVariant = computed(() =>
      useDisabledVariant(props.variant, props.disabled),
    )

    const finalDisabled = computed(
      () =>
        props.disabled ||
        props.variant === 'disabled' ||
        props.variant === 'outline-disabled',
    )

    const variantClasses = computed(
      () => CssVariantClassesTable[finalVariant.value],
    )

    const sizeClasses = computed(() => [
      CssSizeClassesTable[props.size],
      CssSizeClassesTableSquare[props.size][props.square ? 'square' : 'wide'],
    ])

    const allClasses = computed(() => [
      CssStaticClasses,
      variantClasses.value,
      sizeClasses.value,
    ])

    return {
      href: computed(() => props.href),
      type: computed(() => props.type),
      finalDisabled,
      allClasses,
    }
  },
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="allClasses"
    :aria-disabled="finalDisabled ? 'true' : undefined"
    @click="($event) => $emit('click', $event)"
  >
    <slot />
  </a>
  <button
    v-else
    :class="allClasses"
    :disabled="finalDisabled"
    :type="type"
    @click="($event) => $emit('click', $event)"
  >
    <slot />
  </button>
</template>
