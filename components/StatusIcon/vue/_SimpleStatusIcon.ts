import { h } from 'vue'
import type { SVGAttributes } from 'vue'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'

import { simple } from '@cypress-design/constants-statusicon'
import { compileProps } from './compileProps'

export default ({
  size = '24',
  status = 'placeholder',
  ...props
}: SVGAttributes & VariantStatusIconProps) => {
  return h(
    'svg',
    compileProps({
      size,
      status,
      ...props,
      statuses: simple.statuses,
      variantName: 'simple',
    })
  )
}
