import { defineComponent, h } from 'vue'
import type { SVGAttributes } from 'vue'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { outline } from '@cypress-design/constants-statusicon'

import { compileProps } from './compileProps'

export default defineComponent(
  ({
    size = '24',
    status = 'placeholder',
    ...props
  }: SVGAttributes & VariantStatusIconProps) => {
    const { componentProps } = compileProps({
      size,
      status,
      ...props,
      statuses: outline.statuses,
      variantName: 'outline',
    })

    return () => h('svg', componentProps.value)
  },
  {
    props: ['size', 'status'],
  }
)
