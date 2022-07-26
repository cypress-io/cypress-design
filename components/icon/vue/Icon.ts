import { compileIcon } from '@cypress-design/icon-registry'
import type { IconProps } from '@cypress-design/icon-registry'
import { defineComponent, h } from 'vue'
import type { SVGAttributes } from 'vue'
import { compileVueIconProperties } from './compileProperties'

export default defineComponent(
  (props: IconProps & Omit<SVGAttributes, 'name'>) => {
    return h('svg', compileVueIconProperties(compileIcon(props)))
  }
)
