// @ts-check
import {
  TailwindConfig,
  TailwindIconExtractor,
  colors,
} from '@cypress-design/css'
import _ from 'lodash'
import * as path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const { kebabCase, map, reduce } = _

/**
 * @type {string[]}
 */
const safeColors = reduce(
  { ...colors, transparent: { ONLY: true }, current: { ONLY: true } },
  /**
   * @param {string[]} acc
   */
  (acc, variants, colorName) => {
    const name = kebabCase(colorName)

    const colorVariants = map(variants, (_, k) => {
      if (k === 'DEFAULT') return []
      const variantName = k === 'ONLY' ? name : `${name}-${k}`
      const iconColor = ['', 'hover-'].reduce(
        /**
         * @param {string[]} acc_prefix
         */
        (acc_prefix, prefix) => {
          const withSecondaryDerivatives = ['', '-secondary'].reduce(
            /**
             * @param {string[]} acc_int
             */
            (acc_int, suffix) => {
              acc_int.push(`${prefix}icon-light${suffix}-${variantName}`)
              acc_int.push(`${prefix}icon-dark${suffix}-${variantName}`)
              return acc_int
            },

            [],
          )
          acc_prefix.push(...withSecondaryDerivatives)
          return acc_prefix
        },
        /**
         * @type {string[]}
         */
        [],
      )

      return [`bg-${variantName}`, `text-${variantName}`, ...iconColor]
    })

    colorVariants.forEach((variant) => {
      variant.forEach((v) => {
        acc.push(v)
      })
    })

    return acc
  },
  [],
)

const files = [
  './components/**/*.@(tsx|vue|ts|scss|js|css|md)',
  './docs/.vitepress/**/*.vue',
  './docs/src/**/*.vue',
  './docs/docgen/*.cjs',
  './docs/**/*.md',
].map((file) => path.resolve(__dirname, file))

// Outline utilities that might be in string literals and need to be safelisted
// These are used in the Textbox component for focus-visible states
const outlineSafelist = [
  'outline-none',
  'outline-2',
  'outline-offset-0',
  'focus-within:outline-none',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-0',
  // Specific outline color classes used in Textbox component
  'outline-indigo-400',
  'outline-indigo-500',
  'outline-jade-400',
  'outline-jade-500',
  'outline-red-400',
  'outline-red-500',
  'outline-orange-400',
  'outline-orange-500',
  'focus-visible:outline-indigo-400',
  'focus-visible:outline-indigo-500',
  'focus-visible:outline-jade-400',
  'focus-visible:outline-jade-500',
  'focus-visible:outline-red-400',
  'focus-visible:outline-red-500',
  'focus-visible:outline-orange-400',
  'focus-visible:outline-orange-500',
]

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindConfig()],
  darkMode: 'class',
  content: {
    files,
    extract: ['vue', 'jsx', 'tsx', 'ts', 'md'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {},
    ),
  },
  safelist: [...safeColors, ...outlineSafelist],
}
