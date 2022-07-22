import { h } from 'vue'
import type { SVGAttributes } from 'vue'
import type { VariantStatusIconProps } from '../constants'

import { statuses } from '../outline-imports'
import { compileProps } from './compileProps'

export default ({
  size = '24',
  status = 'placeholder',
  ...props
}: SVGAttributes & VariantStatusIconProps) => {
  return h('svg', compileProps({ size, ...props, statuses }))
}
