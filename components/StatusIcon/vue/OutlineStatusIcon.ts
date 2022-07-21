import { h } from 'vue'
import type { SVGAttributes } from 'vue'
import { compileVueStatusIconProperties } from '../constants'
import type { VariantStatusIconProps } from '../constants'

import { statuses } from '../outline-imports'

export default (props: SVGAttributes & VariantStatusIconProps) => {
  return h('svg', compileVueIconProperties(props))
}

export const compileVueIconProperties = ({
  size = '24',
  status,
  ...attributes
}: SVGAttributes & VariantStatusIconProps) => {
  return compileVueStatusIconProperties({ statuses, status, attributes, size })
}
