import { h, type SVGAttributes } from 'vue'
import {
  type VariantStatusIconProps,
  compileVueStatusIconProperties,
} from '../constants'

import { statuses } from '../simple-imports'

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
