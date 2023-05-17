import type { OpenIconProps } from '@cypress-design/icon-registry'
import { ICON_COLOR_PROP_NAMES } from '@cypress-design/icon-registry'
import type { SVGAttributes } from 'vue'

export const compileVueIconProperties = ({
  body,
  compiledClasses,
  size,
  ...attributes
}: Omit<OpenIconProps, 'name'> &
  SVGAttributes & {
    body: string
    compiledClasses: string[]
    size: string
    interactiveColorsOnGroup?: boolean
  }) => {
  const filteredAttributes = Object.keys(attributes).reduce(
    (newAttributes, attrName) => {
      if (
        !ICON_COLOR_PROP_NAMES.includes(
          attrName as (typeof ICON_COLOR_PROP_NAMES)[number]
        ) &&
        attrName !== 'name'
      ) {
        // @ts-expect-error - TS doesn't know that attrName is a key of SVGAttributes
        newAttributes[attrName] =
          attributes[attrName as keyof typeof attributes]
      }
      return newAttributes
    },
    {} as Omit<SVGAttributes, 'name'>
  )

  const componentProps = {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    fill: 'none',
    innerHTML: body,
    class: undefined as string | undefined,
    ...filteredAttributes, // add all standard attributes back to the svg tag
  }
  if (compiledClasses.length) {
    componentProps.class = compiledClasses.join(' ')
  }
  return componentProps
}
