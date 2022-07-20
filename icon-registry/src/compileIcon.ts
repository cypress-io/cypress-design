import { camelCase } from 'lodash'
import {
  OpenIconProps,
  IconProps,
  WindiColor,
  ICON_COLOR_PROP_MANES,
} from './icons'
import { iconsMetadata } from './icons'
import { iconSet } from './iconsList'

export const compileIcon = (props: IconProps) => {
  const { name } = props
  const { availableSizes } = iconsMetadata[name]

  const { sizeWithDefault, compiledClasses } = getComponentAttributes({
    ...(props as any),
    availableSizes,
  })

  const nameWithSize = camelCase(`${name}_x${sizeWithDefault}`)
  const iconData = iconSet.find((i) => i.name === nameWithSize)
  if (!iconData) {
    throw new Error(`icon '${name}' at size ${sizeWithDefault} not found`)
  }
  return {
    ...(props as any),
    size: sizeWithDefault,
    compiledClasses,
    body: iconData.data,
  }
}

export const getComponentAttributes = (
  props: {
    availableSizes: readonly string[]
  } & OpenIconProps
) => {
  const {
    size,
    availableSizes,
    interactiveColorsOnGroup,
    name, // not used, just removed from colors
    ...others
  } = props
  const sizeWithDefault =
    size ??
    (availableSizes.length >= 1
      ? availableSizes.indexOf('16') > -1
        ? '16'
        : availableSizes[0]
      : '')

  const protectedInteractiveColorsOnGroup =
    interactiveColorsOnGroup === undefined
      ? others['interactive-colors-on-group']
      : interactiveColorsOnGroup

  const colors = others

  // TODO: when all icons are converted to using the design system,
  // replace dark by stroke and light by fill,
  // both here and in the windi plugins configs.
  const compiledClasses = Object.keys(colors)
    .filter((attrName) => ICON_COLOR_PROP_MANES.includes(attrName))
    .map((color: WindiColor) => {
      const weightedColor = colors[color]
      if (!weightedColor) {
        return false
      }
      const lowerCaseColor = color.toLowerCase().replace(/-/g, '')
      const colorClass = lowerCaseColor.includes('strokecolor')
        ? 'dark'
        : 'light'
      const secondaryClass = lowerCaseColor.includes('secondary')
        ? '-secondary'
        : ''

      const pseudoClass = lowerCaseColor.includes('hover')
        ? 'hover'
        : lowerCaseColor.includes('focus')
        ? 'focus'
        : lowerCaseColor.includes('hocus')
        ? 'hocus'
        : ''

      const prefix = pseudoClass.length
        ? protectedInteractiveColorsOnGroup !== undefined &&
          protectedInteractiveColorsOnGroup !== false
          ? `group-${pseudoClass}:`
          : `icon-${pseudoClass}:`
        : ''

      const finalClass = `${prefix}icon-${colorClass}${secondaryClass}-${weightedColor}`

      return finalClass
    })

  return { compiledClasses, sizeWithDefault }
}
