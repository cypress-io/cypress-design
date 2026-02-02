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
  // Specific outline color classes used in Textbox component (with opacity)
  'outline-[3px]',
  'outline-gray-300/25',
  'outline-indigo-300/35',
  'outline-jade-300/35',
  'outline-red-300/35',
  'outline-orange-300/35',
  'outline-white/10',
  // Hover states
  'hover:outline-gray-300/25',
  'hover:outline-jade-300/35',
  'hover:outline-red-300/35',
  'hover:outline-orange-300/35',
  'hover:outline-white/10',
  // Focus-within states
  'focus-within:outline-[3px]',
  'focus-within:outline-indigo-300/35',
  'focus-within:outline-jade-300/35',
  'focus-within:outline-red-300/35',
  'focus-within:outline-orange-300/35',
  // Focus-within:hover states
  'focus-within:hover:outline-[3px]',
  'focus-within:hover:outline-indigo-300/35',
  'focus-within:hover:outline-jade-300/35',
  'focus-within:hover:outline-red-300/35',
  'focus-within:hover:outline-orange-300/35',
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
