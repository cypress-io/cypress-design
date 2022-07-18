import { computed, defineComponent, h } from 'vue'
import {
  VariantClassesTable,
  SizeClassesTable,
  StaticClasses,
} from '../constants'
import type { ButtonProps } from '../constants'

export default defineComponent({
  name: 'CyButton',
  setup(
    { variant = 'indigo-dark', size = '32', disabled = false }: ButtonProps,
    { slots }
  ) {
    const finalVariant = computed(() =>
      disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
        ? 'disabled'
        : variant
    )
    const finalDisabled = computed(() => disabled || variant === 'disabled')

    return h(
      'button',
      {
        class: [
          StaticClasses,
          VariantClassesTable[finalVariant.value],
          SizeClassesTable[size],
        ],
        disabled: finalDisabled.value,
      },
      slots.default?.()
    )
  },
})
