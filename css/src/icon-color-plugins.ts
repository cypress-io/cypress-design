/**
 * This package adds support for targeting
 * light vs dark classes in duotone icons.
 *
 * It works by adding utility classes and specific selectors
 */

import createPlugin from 'windicss/plugin';
import { reduce, kebabCase, isObject } from 'lodash';
import { colors } from './colors';

interface RuleConfig {
  name: string;
  theme?: (key: string) => string;
  weight?: string;
  color?: string;
}

const makeRuleForClass = ({ name, theme, weight, color }: RuleConfig) => {
  const resolvedColor = color
    ? color
    : weight
    ? theme?.(`colors.${name}.${weight}`)
    : theme?.(`colors.${name}`);
  let [lightKey, darkKey, secondaryLightKey, secondaryDarkKey] = [
    `.icon-fill-${name}`,
    `.icon-stroke-${name}`,
    `.icon-fill-secondary-${name}`,
    `.icon-stroke-secondary-${name}`,
  ];

  // transparent, black, and white
  if (weight) {
    lightKey += `-${weight}`;
    darkKey += `-${weight}`;
    secondaryLightKey += `-${weight}`;
    secondaryDarkKey += `-${weight}`;
  }

  return {
    // When we're targeting an svg with icon-fill-red-500
    // only attach the fill and stroke for those same icons
    // and vice versa for icon-stroke
    [lightKey]: {
      '> *[fill].icon-fill': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-fill': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-fill-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-fill-stroke': {
        stroke: resolvedColor,
      },
    },
    [secondaryLightKey]: {
      '> *[fill].icon-fill-secondary': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-fill-secondary': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-fill-secondary-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-fill-secondary-stroke': {
        stroke: resolvedColor,
      },
    },
    [darkKey]: {
      '> *[fill].icon-stroke': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-stroke': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-stroke-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-stroke-stroke': {
        stroke: resolvedColor,
      },
    },
    [secondaryDarkKey]: {
      '> *[fill].icon-stroke-secondary': {
        fill: resolvedColor,
      },
      '> *[stroke].icon-stroke-secondary': {
        stroke: resolvedColor,
      },
      '> *[fill][stroke].icon-stroke-secondary-fill': {
        fill: resolvedColor,
      },
      '> *[fill][stroke].icon-stroke-secondary-stroke': {
        stroke: resolvedColor,
      },
    },
  };
};

function addIconUtilityClasses(theme) {
  return reduce(
    colors,
    (acc, variants, colorName) => {
      // lightGray => light-gray
      const name = kebabCase(colorName);

      // Collect the classes we're going to add to the windicss class registry
      let additionalClasses = {};

      // There are both nested and not-nested colors (e.g. black, white)
      if (isObject(variants)) {
        // multiple levels of colors
        additionalClasses = reduce(
          variants,
          (variantAcc, _, weight) => {
            const rules = makeRuleForClass({ name, theme, weight });

            return { ...variantAcc, ...rules };
          },
          {}
        );
      } else {
        // single values like black, white
        additionalClasses = makeRuleForClass({ name, theme });
      }

      // Output is an object where each new class is a key
      // And the selectors and values affected are values
      /**
       * {
       *  `.icon-fill-jade-500`: {
       *    '> *[stroke].icon-fill': {
       *      stroke: resolvedColor
       *    },
       *    '> *[fill].icon-fill': {
       *      fill: resolvedColor
       *    }
       *  }
       * }
       */
      return { ...acc, ...additionalClasses };
    },
    {
      // These technically aren't under "colors"
      ...makeRuleForClass({ name: 'transparent', color: 'transparent' }),
      ...makeRuleForClass({ name: 'current', color: 'currentColor' }),
    }
  );
}

export const IconDuotoneColorsPlugin = createPlugin(
  ({ theme, addUtilities }) => {
    // @ts-ignore - dunno
    addUtilities(addIconUtilityClasses(theme));
  }
);
