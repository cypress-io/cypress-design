import plugin from 'tailwindcss/plugin'

const flattenColorPalette = (colors: any): Record<string, string> =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
          }))
        : [{ [`${color}`]: values }]
    )
  )

function toColorValue(maybeFunction: ((param: any) => string) | string) {
  return typeof maybeFunction === 'function' ? maybeFunction({}) : maybeFunction
}

export default plugin(({ matchComponents, addVariant, theme }) => {
  const iconColorTriggers = [
    'icon-light',
    'icon-dark',
    'icon-light-secondary',
    'icon-dark-secondary',
  ]

  iconColorTriggers.forEach((trigger) => {
    const comp: Record<string, (value: string) => any> = {
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
