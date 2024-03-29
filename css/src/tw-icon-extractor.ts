import _ from 'lodash'
import {
  ADDITIONAL_COLORS,
  ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR,
  isIconAttribute,
  isValidWindiColor,
} from './icon-extractor-tools'
import defaultExtractor from './tw-default-extractor'

const { camelCase } = _

export function getHtmlAttributes(line: string) {
  const attributes = line.matchAll(/([\w-]+)=\{?["']?([^"']*)["']\}?/g)
  if (!attributes) return null
  const attributesArray = Array.from(attributes)
  if (!attributesArray.length) return null
  const names = attributesArray.map((attr) => camelCase(attr[1]))
  const values = attributesArray.map((attr) => attr[2])
  return { names, values }
}

const defaultExtractorFun = defaultExtractor()

/**
 * transforms the attributes of icons into classes
 * to be kept in the tailwindcss css file after purgecss
 */
export const IconExtractor = (line: string): string[] => {
  const classes = defaultExtractorFun(line)
  const htmlAttributes = getHtmlAttributes(line)

  const additionalColorClasses = Array.from(
    htmlAttributes?.names.reduce((set, attrName, index) => {
      if (isIconAttribute(attrName)) {
        const rawValue = htmlAttributes.values[index]
        const checkedValue =
          ADDITIONAL_COLORS.includes(rawValue) || /[a-z]+-\d+/.test(rawValue)
            ? rawValue
            : undefined
        // first, check that the color is valid
        if (checkedValue && isValidWindiColor(checkedValue)) {
          // if it checks out, add the class to the set
          ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[attrName](
            checkedValue,
            true,
          ).forEach((className) => set.add(className))
        }
      }
      return set
    }, new Set<string>()) ?? new Set<string>(),
  )

  return [...classes, ...additionalColorClasses]
}
