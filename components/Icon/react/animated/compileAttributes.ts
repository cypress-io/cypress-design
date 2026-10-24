import {
  HasFillColor,
  HasStrokeColor,
  ICON_COLOR_PROP_NAMES,
  getComponentAttributes,
} from '@cypress-design/icon-registry'
import clsx from 'clsx'
import type { SVGProps } from 'react'

export interface AnimatedProps
  extends HasStrokeColor,
    HasFillColor,
    SVGProps<SVGSVGElement> {
  interactiveColorsOnGroup?: boolean
  className?: string
}

export default function compileAttributes(fullRest: AnimatedProps) {
  const { compiledClasses } = getComponentAttributes({
    ...fullRest,
    availableSizes: ['24'],
  })

  const rest = Object.entries(fullRest).reduce(
    (acc: Record<string, unknown>, [key, value]) => {
      if (
        ICON_COLOR_PROP_NAMES.includes(
          key as (typeof ICON_COLOR_PROP_NAMES)[number],
        )
      ) {
        return acc
      }

      if (value) {
        acc[key] = value
      }

      return acc
    },
    {},
  )
  return { ...rest, className: clsx(compiledClasses, fullRest.className) }
}
