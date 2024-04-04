<script lang="ts">
import { PropType, SlotsType, computed, defineComponent } from 'vue'
import {
  VariantClassesTable,
  SizeClassesTable,
  StaticClasses,
  DefaultSize,
  DefaultVariant,
} from '@cypress-design/constants-button'

import type { ButtonProps } from '@cypress-design/constants-button'

export default defineComponent({
  emits: {
    click($event: MouseEvent) {
      return !!$event
    },
  },
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
  },
  slots: Object as SlotsType<{
    /**
     * The content of the button
     */
    default: void
  }>,
  setup(props) {
    const finalVariant = computed(() =>
      props.disabled &&
      !['outline-dark', 'outline-light', 'link'].includes(props.variant)
        ? props.variant.includes('outline') || props.variant === 'white'
          ? 'outline-disabled'
          : 'disabled'
        : props.variant,
    )
    const finalDisabled = computed(
      () =>
        props.disabled ||
        props.variant === 'disabled' ||
        props.variant === 'outline-disabled',
    )

    const variantClasses = computed(
      () => VariantClassesTable[finalVariant.value],
    )

    const sizeClasses = computed(() => SizeClassesTable[props.size])

    const allClasses = computed(() => [
      StaticClasses,
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
