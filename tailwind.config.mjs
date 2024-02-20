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
  safelist: safeColors,
}
