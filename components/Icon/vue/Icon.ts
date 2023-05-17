import { compileIcon } from '@cypress-design/icon-registry'
import type { IconProps } from '@cypress-design/icon-registry'
import { h } from 'vue'
import type { SVGAttributes } from 'vue'
import { compileVueIconProperties } from './compileProperties'

export default (props: IconProps & Omit<SVGAttributes, 'name'>) => {
  const { class: className, ...otherProps } = props
  const properties = compileVueIconProperties(compileIcon(otherProps))
  return h('svg', {
    ...properties,
    class: [className, properties.class],
  })
}
