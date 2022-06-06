import { type IconProps, compileIcon } from '@cypress-design/icon-registry'
import { h, type SVGAttributes } from 'vue'

export default (props: IconProps & Omit<SVGAttributes, 'name'>) => {
  return h('svg', compileVueIconProperties(compileIcon(props)))
}

export const compileVueIconProperties = ({
  body,
  compiledClasses,
  size,
  strokeColor,
  fillColor,
  secondaryStrokeColor,
  secondaryFillColor,
  class: className,
  ...attributes
}: SVGAttributes & {
  body: string
  compiledClasses: string[]
  size: string
  strokeColor?: string
  fillColor?: string
  secondaryStrokeColor?: string
  secondaryFillColor?: string
}) => {
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    innerHTML: body,
    ...attributes, // add all standard attributes back to the svg tag
  }
  if (compiledClasses.length) {
    componentProps.class = compiledClasses.join(' ')
  }
  return componentProps
}
