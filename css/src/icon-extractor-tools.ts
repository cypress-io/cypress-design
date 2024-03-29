import _ from 'lodash'
import { colors } from './colors'
import {
  COLOR_PREFIXES,
  ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR_ROOT,
} from './color-constants'

const { camelCase, kebabCase } = _

const ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR: Record<
  string,
  (attrValue: string, hasGroupProp: boolean) => string[]
> = {}

COLOR_PREFIXES.forEach((prefix) => {
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
    },
  )
})

export { ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR }

export function isIconAttribute(
  attrName: string,
): attrName is keyof typeof ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR {
  return ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[attrName] !== undefined
}

export const ADDITIONAL_COLORS = ['white', 'black', 'transparent', 'current']

export function isValidWindiColor(value: string) {
  if (ADDITIONAL_COLORS.includes(value)) {
    return true
  }
  const [hue, weight] = value.split('-')
  const hueObject = (colors as Record<string, Record<number, string>>)[hue]
  if (!hueObject) {
    return false
  }
  if (!hueObject[parseInt(weight, 10)]) {
    return false
  }
  return true
}
