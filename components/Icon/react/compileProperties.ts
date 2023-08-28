import * as React from 'react'
import type { ColorIconProps } from '@cypress-design/icon-registry'
import { ICON_COLOR_PROP_NAMES } from '@cypress-design/icon-registry'

export const compileReactIconProperties = ({
  body,
  defs,
  compiledClasses,
  size,
  name,
  ...attributes
}: {
  body: string
  defs?: string
  compiledClasses: string[]
  size: string
  name: string
} & ColorIconProps &
  React.SVGProps<SVGSVGElement>) => {
  const filteredAttributes = Object.keys(attributes).reduce(
    (newAttributes, attrName) => {
      if (
        !ICON_COLOR_PROP_NAMES.includes(
          attrName as (typeof ICON_COLOR_PROP_NAMES)[number],
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
    {} as React.SVGProps<SVGSVGElement>,
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const iconFileId = `${name}_${size}`
    if (defs) {
      if (document.querySelector(`[data-cy-svg-defs="${iconFileId}"]`)) {
        return
      }
      const svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      )
      svgElement.setAttribute('data-cy-svg-defs', iconFileId)
      svgElement.setAttribute('width', '0')
      svgElement.setAttribute('height', '0')
      svgElement.innerHTML = defs
      document.body.appendChild(svgElement)
    }
  }, [defs, name, size])

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
