// @ts-check
import {
  TailwindConfig,
  TailwindIconExtractor,
  colors,
} from '@cypress-design/css'
import _ from 'lodash'

const { kebabCase, map, reduce } = _

const safeColors = reduce(
  { ...colors, transparent: { ONLY: true }, current: { ONLY: true } },
  (acc, variants, colorName) => {
    const name = kebabCase(colorName)

    const colorVariants = map(variants, (_, k) => {
      if (k === 'DEFAULT') return []
      const variantName = k === 'ONLY' ? name : `${name}-${k}`
      return [
        `bg-${variantName}`,
        `text-${variantName}`,
        `icon-light-${variantName}`,
        `icon-dark-${variantName}`,
        `icon-light-secondary-${variantName}`,
        `icon-dark-secondary-${variantName}`,
        `hover-icon-light-${variantName}`,
        `hover-icon-dark-${variantName}`,
        `hover-icon-light-secondary-${variantName}`,
        `hover-icon-dark-secondary-${variantName}`,
      ]
    })

    colorVariants.forEach((variant) => {
      variant.forEach((v) => {
        acc.push(v)
      })
    })

    return acc
  },
  []
)

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindConfig()],
  darkMode: 'class',
  content: {
    files: [
      './components/**/*.@(tsx|vue|ts|scss|js|css|md)',
      './docs/.vitepress/**/*.vue',
      './docs/src/**/*.vue',
      './docs/docgen/*.cjs',
      './docs/**/*.md',
    ],
    extract: ['vue', 'jsx', 'tsx', 'ts', 'md'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
  safelist: safeColors,
}
