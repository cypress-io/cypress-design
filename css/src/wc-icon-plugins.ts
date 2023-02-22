/**
 * This package adds support for targeting
 * light vs dark classes in duotone icons.
 *
 * It works by adding utility classes and specific selectors
 */

import createPlugin from 'windicss/plugin'
import _ from 'lodash'
import { colors } from './colors'
import { DeepNestObject } from 'windicss/types/interfaces'

const { reduce, kebabCase, isObject } = _

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
  },
  { name: 'cypress-icon-duotone-colors' }
)
