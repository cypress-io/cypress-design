import { camelCase } from 'lodash-es'
import { COLOR_PREFIXES } from '@cypress-design/color-constants'
import type { OpenIconProps, ColorIconProps, IconProps } from './icons'
import { iconsMetadata, ICON_COLOR_PROP_NAMES, iconSet } from './icons'

export const compileIcon = (
  props: Omit<OpenIconProps, 'name'> & Pick<IconProps, 'name'>,
) => {
  const { interactiveColorsOnGroup, name, ...cleanProps } = props
  const { availableSizes } = iconsMetadata[name]

  const { sizeWithDefault, compiledClasses } = getComponentAttributes({
    ...cleanProps,
    availableSizes,
    interactiveColorsOnGroup,
  })

  const nameWithSize = camelCase(`${name}_x${sizeWithDefault}`)
  const iconData = iconSet.find((i) => i.name === nameWithSize)
  if (!iconData) {
    throw new Error(`icon '${name}' at size ${sizeWithDefault} not found`)
  }

  // SVGO always brings defs to the end of the file
  // so we can split the file in two parts
  // and use the first part as the body
  const defsStart = iconData.data.indexOf('<defs>')

  return {
    ...cleanProps,
    name,
    size: sizeWithDefault,
    compiledClasses,
    body: defsStart >= 0 ? iconData.data.slice(0, defsStart) : iconData.data,
    defs: defsStart >= 0 ? iconData.data.slice(defsStart) : undefined,
  }
}

export const getComponentAttributes = (
  props: {
    availableSizes: readonly string[]
  } & Omit<OpenIconProps, 'name'>,
) => {
  const { size, availableSizes, interactiveColorsOnGroup, ...otherProps } =
    props
  const sizeWithDefault =
    size ??
    (availableSizes.length >= 1
      ? availableSizes.indexOf('16') > -1
        ? '16'
        : availableSizes[0]
      : '')

  const protectedInteractiveColorsOnGroup =
    interactiveColorsOnGroup === undefined
      ? otherProps['interactive-colors-on-group']
      : interactiveColorsOnGroup

  delete otherProps['interactive-colors-on-group']

  // TODO: when all icons are converted to using the design system,
  // replace dark by stroke and light by fill,
  // both here and in the tailwind plugins configs.
  const compiledClasses = Object.keys(otherProps)
    .filter(
      (attrName) =>
        otherProps[attrName as keyof typeof otherProps] &&
        ICON_COLOR_PROP_NAMES.includes(
          attrName as (typeof ICON_COLOR_PROP_NAMES)[number],
        ),
    )
    .map((colorAttrName: string) => {
      const color = otherProps[colorAttrName as keyof ColorIconProps]
      const lowerCaseColor = colorAttrName.toLowerCase().replace(/-/g, '')
      const colorClass = lowerCaseColor.includes('strokecolor')
        ? 'dark'
        : 'light'
      const secondaryClass = lowerCaseColor.includes('secondary')
        ? '-secondary'
        : ''

      const pseudoClass = COLOR_PREFIXES.reduce((state, sta) => {
        if (state.length) return state
        return lowerCaseColor.includes(sta.replace(/-/g, '')) ? sta : ''
      }, '')

      const prefix = pseudoClass.length
        ? protectedInteractiveColorsOnGroup !== undefined &&
          protectedInteractiveColorsOnGroup !== false
          ? `group-${pseudoClass}:`
          : `icon-${pseudoClass}:`
        : ''

      const finalClass = `${prefix}icon-${colorClass}${secondaryClass}-${color}`

      return finalClass
    })

  return { compiledClasses, sizeWithDefault }
}
