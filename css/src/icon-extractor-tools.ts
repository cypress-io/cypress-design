import { camelCase, kebabCase } from 'lodash-es'
import { colors } from './colors'

const prefixes = ['', 'hover', 'focus', 'hocus'] as const

const ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR_ROOT = {
  FillColor: (attrValue: string) => `icon-light-${attrValue}`,
  StrokeColor: (attrValue: string) => `icon-dark-${attrValue}`,
  SecondaryFillColor: (attrValue: string) =>
    `icon-light-secondary-${attrValue}`,
  SecondaryStrokeColor: (attrValue: string) =>
    `icon-dark-secondary-${attrValue}`,
} as const

const ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR: Record<
  string,
  (attrValue: string, hasGroupProp: boolean) => string[]
> = {}

prefixes.forEach((prefix) => {
  Object.entries(ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR_ROOT).forEach(
    ([root, value]) => {
      ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[camelCase(`${prefix}${root}`)] =
        ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[kebabCase(`${prefix}${root}`)] =
          (attrValue, hasGroupProp) => {
            if (!prefix.length) {
              return [value(attrValue)]
            }
            // add the icon-hover: or icon-focus: prefix
            const normalClass = `${prefix}:${value(attrValue)}`

            if (!hasGroupProp) {
              return prefix.length ? [`icon-${normalClass}`] : [normalClass]
            }

            // always keep the group-focus and group-hover classes
            return [`icon-${normalClass}`, `group-${normalClass}`]
          }
    }
  )
})

export { ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR }

export function isIconAttribute(
  attrName: string
): attrName is keyof typeof ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR {
  return ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR.hasOwnProperty(attrName)
}

export const ADDITIONAL_COLORS = ['white', 'black', 'transparent', 'current']

export function isValidWindiColor(value: string) {
  if (ADDITIONAL_COLORS.includes(value)) {
    return true
  }
  const [hue, weight] = value.split('-')
  const hueObject = (colors as any)[hue]
  if (!hueObject) {
    return false
  }
  if (!hueObject[parseInt(weight, 10)]) {
    return false
  }
  return true
}
