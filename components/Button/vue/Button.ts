import { computed, defineComponent, h } from 'vue'
import {
  VariantClassesTable,
  SizeClassesTable,
  StaticClasses,
  ButtonPropsList,
} from '../constants'
import type { ButtonProps } from '../constants'

const Button = defineComponent<ButtonProps>(function (props, { slots }) {
  const { variant = 'indigo-dark', size = '32', disabled = false } = props

  const finalVariant = computed(() =>
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? 'disabled'
      : variant
  )
  const finalDisabled = computed(() => disabled || variant === 'disabled')

  return () =>
    h(
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
})

Button.props = ButtonPropsList

export default Button
