import type { ColorIconProps } from '@cypress-design/icon-registry'
import { ICON_COLOR_PROP_NAMES } from '@cypress-design/icon-registry'

export const compileReactIconProperties = ({
  body,
  compiledClasses,
  size,
  ...attributes
}: {
  body: string
  compiledClasses: string[]
  size: string
} & ColorIconProps &
  React.SVGProps<SVGSVGElement>) => {
  const filteredAttributes = Object.keys(attributes).reduce(
    (newAttributes, attrName) => {
      if (!ICON_COLOR_PROP_NAMES.includes(attrName)) {
        newAttributes[attrName] =
          attributes[attrName as keyof typeof attributes]
      }
      return newAttributes
    },
    {} as Record<string, any>
  )
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    dangerouslySetInnerHTML: {
      __html: body,
    },
    ...filteredAttributes, // add all standard attributes back to the svg tag
  }
  if (attributes.className) {
    compiledClasses.push(attributes.className)
  }
  if (compiledClasses.length) {
    componentProps.className = compiledClasses.join(' ')
  }
  return componentProps
}
