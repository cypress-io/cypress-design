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

function toColorValue(maybeFunction: ((param: {}) => string) | string) {
  return typeof maybeFunction === 'function' ? maybeFunction({}) : maybeFunction
}

export default plugin(({ matchComponents, addVariant, theme }) => {
  const iconVariants = [
    'icon-light',
    'icon-dark',
    'icon-light-secondary',
    'icon-dark-secondary',
  ]

  iconVariants.forEach((variant) => {
    const comp: Record<string, (value: string) => any> = {
      [variant]: (value: string) => [
        {
          [` > [fill].${variant}`]: {
            fill: toColorValue(value),
          },
        },
        {
          [` > [stroke].${variant}`]: {
            stroke: toColorValue(value),
          },
        },
        {
          [` > [stroke][fill].${variant}-fill`]: {
            fill: toColorValue(value),
          },
        },
        {
          [` > [stroke][fill].${variant}-stroke`]: {
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
  addVariant('icon-hocus', ['&:focus', '&:hover'])
})
