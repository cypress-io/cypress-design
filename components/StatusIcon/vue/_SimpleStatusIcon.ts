import { defineComponent, h } from 'vue'
import type { SVGAttributes } from 'vue'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { simple } from '@cypress-design/constants-statusicon'

import { compileProps } from './compileProps'

export default defineComponent(
  ({
    size = '24',
    status = 'placeholder',
    ...props
  }: SVGAttributes & VariantStatusIconProps) => {
    const iconProps = compileProps({
      size,
      status,
      ...props,
      statuses: simple.statuses,
      variantName: 'solid',
    })

    return () => h('svg', iconProps.value)
  },
  {
    props: ['size', 'status'],
  }
)
