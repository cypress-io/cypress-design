import {
  type IconProps,
  type OpenIconProps,
  compileIcon,
} from '@cypress-design/icon-registry'
import { h, type SVGAttributes } from 'vue'

export default (props: IconProps & Omit<SVGAttributes, 'name'>) => {
  return h('svg', compileVueIconProperties(compileIcon(props)))
}

export const compileVueIconProperties = ({
  body,
  compiledClasses,
  size,
  class: className,
  interactiveColorsOnGroup,
  ...attributes
}: Omit<OpenIconProps, 'name'> &
  SVGAttributes & {
    body: string
    compiledClasses: string[]
    size: string
    interactiveColorsOnGroup?: boolean
  }) => {
  Object.keys(attributes).forEach((key) => {
    if (key.endsWith('Color')) {
      // @ts-ignore
      delete attributes[key]
    }
  })
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
