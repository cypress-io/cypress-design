import { kebabCase, camelCase } from 'lodash'
import { colors } from './colors'
import { DefaultExtractor } from 'vite-plugin-windicss'
import { Extractor } from 'windicss/types/interfaces'

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
  (attrValue: string, hasGroupProp: boolean) => string
> = {}

prefixes.forEach((prefix) => {
  Object.entries(ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR_ROOT).forEach(
    ([root, value]) => {
      ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[camelCase(`${prefix}${root}`)] =
        ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[kebabCase(`${prefix}${root}`)] =
          (attrValue, hasGroupProp) => {
            if (!prefix.length) {
              return value(attrValue)
            }
            // add the icon-hover: or icon-focus: prefix
            const normalClass = `${prefix}:${value(attrValue)}`

            if (!hasGroupProp) {
              return prefix.length ? `icon-${normalClass}` : normalClass
            }

            // always keep the group-focus and group-hover classes
            return `icon-${normalClass} group-${normalClass}`
          }
    }
  )
})

export { ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR }

function isIconAttribute(
  attrName: string
): attrName is keyof typeof ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR {
  return ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR.hasOwnProperty(attrName)
}

const ADDITIONAL_COLORS = ['white', 'black', 'transparent', 'current']

function isValidWindiColor(value: string) {
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

/**
 * transforms the attributes of icons into classes
 * to be kept in the windicss css file after purgecss
 */
export const IconExtractor: Extractor = {
  extensions: ['vue', 'js', 'ts', 'tsx', 'astro'],
  extractor: (code, id) => {
    const { tags, classes = [], attributes } = DefaultExtractor(code, id)

    const hasAGroupAttribute =
      code.includes('interactiveColorsOnGroup') ||
      // With vuejs templates, sometimes the attributes are hyphenated
      code.includes('interactive-colors-on-group')

    const additionalColorClasses =
      attributes?.names.reduce((set, attrName, index) => {
        if (isIconAttribute(attrName)) {
          const rawValue = attributes.values[index]
          const checkedValue =
            ADDITIONAL_COLORS.includes(rawValue) || /[a-z]+-\d+/.test(rawValue)
              ? rawValue
              : undefined
          // first, check that the color is valid
          if (checkedValue && isValidWindiColor(checkedValue)) {
            // if it checks out, add the class to the set
            set.add(
              ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[attrName](
                checkedValue,
                hasAGroupAttribute
              )
            )
          }
        }
        return set
      }, new Set<string>()) ?? new Set<string>()

    return {
      tags,
      get classes() {
        return [...classes, ...Array.from(additionalColorClasses)]
      },
      attributes,
    }
  },
}
