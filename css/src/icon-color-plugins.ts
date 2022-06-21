/**
 * This package adds support for targeting
 * light vs dark classes in duotone icons.
 *
 * It works by adding utility classes and specific selectors
 */

import createPlugin from 'windicss/plugin'
import { reduce, kebabCase, isObject } from 'lodash'
import { colors } from './colors'
import { DefaultExtractor } from 'vite-plugin-windicss'
import { Extractor } from 'windicss/types/interfaces'

interface RuleConfig {
  name: string
  theme?: (key: string) => string
  weight?: string
  color?: string
}

const makeRuleForClass = ({ name, theme, weight, color }: RuleConfig) => {
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
  ({ theme, addUtilities }) => {
    // @ts-ignore - dunno
    addUtilities(addIconUtilityClasses(theme))
  }
)

export const ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR = {
  fillColor: (attrValue: string) => `icon-light-${attrValue}`,
  strokeColor: (attrValue: string) => `icon-dark-${attrValue}`,
  secondaryFillColor: (attrValue: string) =>
    `icon-light-secondary-${attrValue}`,
  secondaryStrokeColor: (attrValue: string) =>
    `icon-dark-secondary-${attrValue}`,
} as const

function isIconAttribute(
  attrName: string
): attrName is keyof typeof ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR {
  return ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR.hasOwnProperty(attrName)
}

/**
 * transforms the attributes of icons into classes
 * to be kept in the windicss css file after purgecss
 */
export const IconExtractor: Extractor = {
  extensions: ['vue', 'js', 'ts', 'tsx'],
  extractor: (code, id) => {
    const { tags, classes = [], attributes } = DefaultExtractor(code, id)

    const additionalColorClasses =
      attributes?.names.reduce((set, attrName, index) => {
        if (isIconAttribute(attrName)) {
          set.add(
            ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR[attrName](
              attributes.values[index]
            )
          )
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
