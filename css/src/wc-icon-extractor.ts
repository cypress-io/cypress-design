import { DefaultExtractor } from 'vite-plugin-windicss'
import { Extractor } from 'windicss/types/interfaces'
import {
  ADDITIONAL_COLORS,
  ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR,
  isIconAttribute,
  isValidWindiColor,
} from './icon-extractor-tools'

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
            // if it checks out, add the classes to the set
            ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[attrName](
              checkedValue,
              hasAGroupAttribute
            ).forEach((className) => set.add(className))
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
