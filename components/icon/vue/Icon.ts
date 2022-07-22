import type { IconProps } from '@cypress-design/icon-registry'
import { compileIcon } from '@cypress-design/icon-registry'
import type { SVGAttributes } from 'vue'
import { h } from 'vue'
import { compileVueIconProperties } from './compileProperties'

export default (props: IconProps & Omit<SVGAttributes, 'name'>) => {
  return h('svg', compileVueIconProperties(compileIcon(props)))
}
