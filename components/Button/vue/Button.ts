import { computed, defineComponent, h } from 'vue'
import {
  VariantClassesTable,
  SizeClassesTable,
  StaticClasses,
} from '../constants'
import type { ButtonProps } from '../constants'

const Button = defineComponent((props: ButtonProps, { slots }) => {
  const {
    variant = 'indigo-dark',
    size = '32',
    disabled = false,
    ...rest
  } = props

  const finalVariant = computed(() =>
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? 'disabled'
      : variant
  )
  const finalDisabled = computed(() => disabled || variant === 'disabled')

  return () =>
    h(
      props.href ? 'a' : 'button',
      {
        // type: props.href ? undefined : 'button',
        ...rest,
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
Button.props = ['variant', 'size', 'disabled']

export default Button
