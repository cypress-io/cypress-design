import { defineComponent, h } from 'vue'
import type { SVGAttributes } from 'vue'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { solid } from '@cypress-design/constants-statusicon'

import { compileProps } from './compileProps'

export default defineComponent({
  props: ['size', 'status'],
  setup({
    size = '24',
    status = 'placeholder',
    ...props
  }: SVGAttributes & VariantStatusIconProps) {
    const { componentProps } = compileProps({
      size,
      status,
      ...props,
      statuses: solid.statuses,
      variantName: 'solid',
    })

    return () => h('svg', componentProps.value)
  },
})
