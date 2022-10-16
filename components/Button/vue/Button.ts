import { computed, defineComponent, h } from 'vue'
import {
  VariantClassesTable,
  SizeClassesTable,
  StaticClasses,
  DefaultSize,
  DefaultVariant,
} from '../constants'
import type { ButtonProps } from '../constants'

const Button = defineComponent((props: ButtonProps, { slots }) => {
  const {
    variant = DefaultVariant,
    size = DefaultSize,
    disabled = false,
    href,
  } = props

  const finalVariant = computed(() =>
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? 'disabled'
      : variant
  )
  const finalDisabled = computed(() => disabled || variant === 'disabled')

  return () =>
    h(
      href ? 'a' : 'button',
      {
        // type: props.href ? undefined : 'button',
        href,
        class: [
          StaticClasses,
          VariantClassesTable[finalVariant.value],
          SizeClassesTable[size],
        ],
        disabled: finalDisabled.value,
      },
      slots.default?.()
    )
})

// NOTE: this allows vue to use the props as props instead of attributes
// Without it, size, variant and disabled are used in the DOM as attributes
Button.props = ['variant', 'size', 'disabled', 'href']

export default Button
