const { TailwindConfig, TailwindIconExtractor } = require('@cypress-design/css')
const { colors } = require('@cypress-design/css')
const { map, reduce, kebabCase } = require('lodash')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [TailwindConfig()],
  content: {
    files: ['./stories/**/*.@(ts|tsx|mdx)'],
    extract: ['jsx', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
  safelist: reduce(
    { ...colors, transparent: { ONLY: true }, current: { ONLY: true } },
    (acc, variants, colorName) => {
      const name = kebabCase(colorName)

      return `${acc}
			${map(variants, (_, k) => {
        if (k === 'DEFAULT') return ``
        const variantName = k === 'ONLY' ? name : `${name}-${k}`
        return `
					bg-${variantName}
					text-${variantName}
					before:bg-${variantName}
					before:text-${variantName}
					icon-light-${variantName}
					icon-dark-${variantName}
					icon-light-secondary-${variantName}
					icon-dark-secondary-${variantName}`
      }).join(' ')}`
    }
  ),
}
