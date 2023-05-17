import { compileIcon } from '@cypress-design/icon-registry'
import type { OpenIconProps, IconProps } from '@cypress-design/icon-registry'
import { h } from 'vue'
import type { SVGAttributes } from 'vue'
import { compileVueIconProperties } from './compileProperties'

export default (
  // the OpenIconProps helps volar extract the documentation from the props
  // since the IconProps are more restrictive, it will not change the use behavior
  props: OpenIconProps & IconProps & Omit<SVGAttributes, 'name'>
) => {
  const { class: className, ...otherProps } = props
  const properties = compileVueIconProperties(compileIcon(otherProps))
  return h('svg', {
    ...properties,
    class: [className, properties.class],
  })
}
