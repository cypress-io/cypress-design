/**
 * This package adds support for targeting
 * light vs dark classes in duotone icons.
 *
 * It works by adding utility classes and specific selectors
 */

import createPlugin from 'windicss/plugin'
import { reduce, kebabCase, isObject, camelCase } from 'lodash'
import { colors } from './colors'
import { DefaultExtractor } from 'vite-plugin-windicss'
import { DeepNestObject, Extractor } from 'windicss/types/interfaces'

interface RuleConfig {
  name: string
  theme?: (key: string) => string
  weight?: string
  color?: string
}

const makeRuleForClass = ({
  name,
  theme,
  weight,
  color,
}: RuleConfig): DeepNestObject => {
  const resolvedColor = color
    ? color
    : weight
    ? theme?.(`colors.${name}.${weight}`)
    : theme?.(`colors.${name}`)
  let [lightKey, darkKey, secondaryLightKey, secondaryDarkKey] = [
    `.icon-light-${name}`,
    `.icon-dark-${name}`,
    `.icon-light-secondary-${name}`,
    `.icon-dark-secondary-${name}`,
  ]

  if (!resolvedColor) {
    return {}
  }

  // transparent, black, and white
  if (weight) {
    lightKey += `-${weight}`
    darkKey += `-${weight}`
    secondaryLightKey += `-${weight}`
    secondaryDarkKey += `-${weight}`
  }

  return {
    // When we're targeting an svg with icon-light-red-500
    // only attach the fill and stroke for those same icons
    // and vice versa for icon-dark
    [lightKey]: {
      '> *[fill].icon-light': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-light': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-light-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-light-stroke': {
        stroke: resolvedColor,
      },
    },
    [secondaryLightKey]: {
      '> *[fill].icon-light-secondary': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-light-secondary': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-light-secondary-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-light-secondary-stroke': {
        stroke: resolvedColor,
      },
    },
    [darkKey]: {
      '> *[fill].icon-dark': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-dark': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-dark-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-dark-stroke': {
        stroke: resolvedColor,
      },
    },
    [secondaryDarkKey]: {
      '> *[fill].icon-dark-secondary': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-dark-secondary': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-dark-secondary-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-dark-secondary-stroke': {
        stroke: resolvedColor,
      },
    },
  }
}

function addIconUtilityClasses(theme: (key: string) => string) {
  return reduce(
    colors,
    (acc, variants, colorName) => {
      // lightGray => light-gray
      const name = kebabCase(colorName)

      // Collect the classes we're going to add to the windicss class registry
      let additionalClasses = {}

      // There are both nested and not-nested colors (e.g. black, white)
      if (isObject(variants)) {
        // multiple levels of colors
        additionalClasses = reduce(
          variants,
          (variantAcc, _, weight) => {
            const rules = makeRuleForClass({ name, theme, weight })

            return { ...variantAcc, ...rules }
          },
          {}
        )
      } else {
        // single values like black, white
        additionalClasses = makeRuleForClass({ name, theme })
      }

      // Output is an object where each new class is a key
      // And the selectors and values affected are values
      /**
       * {
       *  `.icon-light-jade-500`: {
       *    '> *[stroke].icon-light': {
       *      stroke: resolvedColor
       *    },
       *    '> *[fill].icon-light': {
       *      fill: resolvedColor
       *    }
       *  }
       * }
       */
      return { ...acc, ...additionalClasses }
    },
    {
      // These technically aren't under "colors"
      ...makeRuleForClass({ name: 'transparent', color: 'transparent' }),
      ...makeRuleForClass({ name: 'current', color: 'currentColor' }),
    }
  )
}

export const IconDuotoneColorsPlugin = createPlugin(
  ({ theme, addUtilities, addVariant }) => {
    addUtilities(addIconUtilityClasses(theme as any))
    /**
     * Adding the class `hover:icon-light-red-500` to will not
     * apply the color to the icon when hovered. Instead,
     * it will apply the color to the icon when each path is hovered.
     * This is not the behavior we expect.
     *
     * `icon-hover:icon-light-red-500` will move the pseudo class to
     * the icon itself (cf the unit test result).
     *
     * With `icon-hover:icon-light-red-500`, windiCSS yields
     *
     * ```
     * .icon-light-red-500 > *[fill]:hover{
     *  fill: resolvedColor
     * }
     * ```
     *
     * and with `icon-hover` instead of `hover`, it yields
     *
     * ```
     * .icon-light-red-500:hover > *[fill]{
     *  fill: resolvedColor
     * }
     * ```
     */
    addVariant('icon-hover', ({ modifySelectors }) => {
      return modifySelectors(({ className }) => {
        return `.${className}:hover`
      })
    })
    addVariant('icon-focus', ({ modifySelectors }) => {
      return modifySelectors(({ className }) => {
        return `.${className}:focus`
      })
    })
    addVariant('icon-hocus', ({ modifySelectors }) => {
      return modifySelectors(({ className }) => {
        return `.${className}:hover, .${className}:focus`
      })
    })
  }
)

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
      ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[camelCase(`${prefix}${root}`)] = (
        attrValue,
        hasGroupProp
      ) => {
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

function isValidWindiColor(value: string) {
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
  extensions: ['vue', 'js', 'ts', 'tsx'],
  extractor: (code, id) => {
    const { tags, classes = [], attributes } = DefaultExtractor(code, id)

    const hasAGroupAttribute =
      attributes?.names.includes('interactiveColorsOnGroup') ?? false

    const additionalColorClasses =
      attributes?.names.reduce((set, attrName, index) => {
        if (isIconAttribute(attrName)) {
          const attrValueClasses =
            attributes.values[index].match(/[a-z]+-\d+/g) || []
          attrValueClasses.forEach((value) => {
            // first, check that the color is valid
            if (isValidWindiColor(value)) {
              // if it checks out, add the class to the set
              set.add(
                ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[attrName](
                  value,
                  hasAGroupAttribute
                )
              )
            }
          })
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
