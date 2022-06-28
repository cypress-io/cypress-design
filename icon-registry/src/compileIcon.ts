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
      const colorValue = colors[color]
      if (!colorValue) {
        return false
      }
      const lowerCaseColor = color.toLowerCase()
      const colorClass = lowerCaseColor.includes('strokecolor')
        ? 'dark'
        : 'light'
      const secondaryClass = lowerCaseColor.includes('secondary')
        ? '-secondary'
        : ''

      const prefixClass = lowerCaseColor.includes('hover')
        ? 'hover:'
        : lowerCaseColor.includes('focus')
        ? 'focus:'
        : lowerCaseColor.includes('hocus')
        ? 'hocus:'
        : ''

      const groupPrefix =
        interactiveColorsOnGroup !== undefined &&
        interactiveColorsOnGroup !== false &&
        prefixClass.length
          ? 'group-'
          : ''

      const finalClass = `${groupPrefix}${prefixClass}icon-${colorClass}${secondaryClass}-${colorValue}`

      return finalClass
    })
    .filter((cl): cl is string => cl !== false)

  return { compiledClasses, sizeWithDefault }
}
