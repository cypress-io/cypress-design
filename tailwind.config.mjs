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
      const iconColor = ['', 'hover-'].reduce((acc, prefix) => {
        const withSecondaryDerivatives = ['', '-secondary'].reduce(
          (acc, suffix) => {
            acc.push(`${prefix}icon-light${suffix}-${variantName}`)
            acc.push(`${prefix}icon-dark${suffix}-${variantName}`)
            return acc
          },
          []
        )
        acc.push(...withSecondaryDerivatives)
        return acc
      }, [])

      return [`bg-${variantName}`, `text-${variantName}`, ...iconColor]
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
