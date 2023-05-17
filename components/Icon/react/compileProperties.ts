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
      if (
        !ICON_COLOR_PROP_NAMES.includes(
          attrName as (typeof ICON_COLOR_PROP_NAMES)[number]
        ) &&
        attrName !== 'name'
      ) {
        // @ts-expect-error the ky of React's SVGProps is too broad and
        // breaks here. Since we do not need to check for it. We keep the expect error
        newAttributes[attrName] =
          attributes[attrName as keyof typeof attributes]
      }
      return newAttributes
    },
    {} as React.SVGProps<SVGSVGElement>
  )
  const componentProps = {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    fill: 'none',
    dangerouslySetInnerHTML: {
      __html: body,
    },
    className: undefined as string | undefined,
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
