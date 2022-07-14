import { type IconProps, type OpenIconProps, iconsMetadata } from './icons'
import { iconSet } from './iconsList'
import camelCase from 'camelcase'

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

export const getComponentAttributes = ({
  size,
  availableSizes,
  interactiveColorsOnGroup,
  name, // not used, just removed from colors
  ...colors
}: {
  size: string
  availableSizes: readonly string[]
  interactiveColorsOnGroup?: boolean
} & OpenIconProps) => {
  const sizeWithDefault =
    size ??
    (availableSizes.length >= 1
      ? availableSizes.indexOf('16') > -1
        ? '16'
        : availableSizes[0]
      : '')

  // TODO: when all icons are converted to using the design system,
  // replace dark by stroke and light by fill,
  // both here and in the windi plugins configs.
  const compiledClasses = Object.keys(colors)
    .map((color) => {
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
        ? interactiveColorsOnGroup !== undefined &&
          interactiveColorsOnGroup !== false
          ? `group-${pseudoClass}:`
          : `icon-${pseudoClass}:`
        : ''

      const finalClass = `${prefix}icon-${colorClass}${secondaryClass}-${colorWeight}`

      return finalClass
    })
    .filter((cl): cl is string => cl !== false)

  return { compiledClasses, sizeWithDefault }
}
