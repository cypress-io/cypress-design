<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
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
      type: String as () => NonNullable<ButtonProps['variant']>,
      default: DefaultVariant,
    },
    size: {
      type: String as () => NonNullable<ButtonProps['size']>,
      default: DefaultSize,
    },
    disabled: {
      type: Boolean as () => ButtonProps['disabled'],
      default: false,
    },
    href: {
      type: String as () => ButtonProps['href'],
    },
    type: {
      type: String as () => ButtonProps['type'],
      default: 'button',
    },
  },
  setup(props) {
    const { variant, size, disabled, href, type, ...attr } = props

    const finalVariant = computed(() =>
      props.disabled &&
      !['outline-dark', 'outline-light', 'link'].includes(props.variant)
        ? 'disabled'
        : props.variant
    )
    const finalDisabled = computed(
      () => props.disabled || props.variant === 'disabled'
    )

    return {
      componentTag: computed(() => (href ? 'a' : 'button')),
      href,
      buttonProps: reactive({
        ...attr,
        class: [
          StaticClasses,
          VariantClassesTable[finalVariant.value],
          SizeClassesTable[props.size],
        ],
        disabled: finalDisabled.value,
      }),
    }
  },
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    v-bind="buttonProps"
    @click="($event) => $emit('click', $event)"
  >
    <slot />
  </a>
  <button
    v-else
    v-bind="buttonProps"
    @click="($event) => $emit('click', $event)"
  >
    <slot />
  </button>
</template>
