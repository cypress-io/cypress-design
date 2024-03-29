import plugin from 'tailwindcss/plugin'
import { CSSRuleObject, KeyValuePair } from 'tailwindcss/types/config'

const flattenColorPalette = (
  colors:
    | Record<string, Record<string, string>>
    | Record<string, string>
    | undefined,
): Record<string, string> =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
          }))
        : [{ [`${color}`]: values }],
    ),
  )

function toColorValue(maybeFunction: ((param: string) => string) | string) {
  return typeof maybeFunction === 'function' ? maybeFunction('') : maybeFunction
}

export default plugin(({ matchComponents, addVariant, theme }) => {
  const iconColorTriggers = [
    'icon-light',
    'icon-dark',
    'icon-light-secondary',
    'icon-dark-secondary',
  ]

  iconColorTriggers.forEach((trigger) => {
    const comp: KeyValuePair<
      string,
      (value: string, extra: { modifier: string | null }) => CSSRuleObject[]
    > = {
      [trigger]: (value: string) => [
        {
          [` > *[fill].${trigger}`]: {
            fill: toColorValue(value),
          },
        },
        {
          [` > *[stroke].${trigger}`]: {
            stroke: toColorValue(value),
          },
        },
        {
          [` > *[stroke][fill].${trigger}-fill`]: {
            fill: toColorValue(value),
          },
        },
        {
          [` > *[stroke][fill].${trigger}-stroke`]: {
            stroke: toColorValue(value),
          },
        },
      ],
    }

    // @ts-expect-error - matchComponents is not typed properly
    matchComponents(comp, {
      values: flattenColorPalette(theme('fill')),
      type: ['color', 'any'],
    })
  })

  addVariant('icon-hover', '&:hover')
  addVariant('icon-focus', '&:focus')
  addVariant('icon-focus-within', '&:focus-within')
  addVariant('icon-hocus', ['&:focus', '&:hover'])
})
