<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
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
  props: ['variant', 'size', 'disabled', 'href'] as any,
  setup(props: ButtonProps) {
    const {
      variant = DefaultVariant,
      size = DefaultSize,
      disabled = false,
      href,
      type = 'button',
      ...attr
    } = props

    const finalVariant = computed(() =>
      disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
        ? 'disabled'
        : variant
    )
    const finalDisabled = computed(() => disabled || variant === 'disabled')

    return {
      componentTag: computed(() => (href ? 'a' : 'button')),
      href,
      buttonProps: reactive({
        ...attr,
        class: [
          StaticClasses,
          VariantClassesTable[finalVariant.value],
          SizeClassesTable[size],
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
