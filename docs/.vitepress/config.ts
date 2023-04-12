import { defineConfig } from 'vitepress'
import {
  CyCSSVitePlugin,
  WindiIconExtractor,
  colors,
} from '@cypress-design/css'
import { resolve } from 'path'

import _ from 'lodash'

const { kebabCase, map, reduce } = _

import vueLiveMd from './vue-live-md-it'
import { APPEARANCE_KEY } from './theme/utils/useAppearance'

const branch = process.env.GIT_BRANCH || 'main'

const fallbackPreference = 'auto'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Cypress Design System',
  outDir: './dist',
  markdown: {
    config(md) {
      md.use(vueLiveMd)
    },
  },
  head: [
    [
      'script',
      { id: 'check-dark-light' },
      `
      ;(() => {
        const preference = localStorage.getItem('${APPEARANCE_KEY}') || '${fallbackPreference}'
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (!preference || preference === 'auto' ? prefersDark : preference === 'dark') {
          document.documentElement.classList.add('dark')
        }
      })()
    `,
    ],
  ],
  vite: {
    define: {
      'import.meta.env.EDIT_ROOT_LOCAL': JSON.stringify(
        `vscode://file/${resolve(__dirname, '../../')}`
      ),
      'import.meta.env.EDIT_ROOT_GITHUB': JSON.stringify(
        `https://github.com/cypress-io/cypress-design/blob/${branch}/`
      ),
    },
    plugins: CyCSSVitePlugin({
      scan: {
        include: [
          resolve(
            __dirname,
            '../../components/**/*.{tsx,vue,ts,scss,js,css,md}'
          ),
          resolve(__dirname, './theme/**/*.vue'),
          resolve(__dirname, '../src/**/*.vue'),
          resolve(__dirname, '../docgen/*.cjs'),
          resolve(__dirname, '../**/*.md'),
        ],
      },
      config: {
        safelist: safeColors(),
        extract: {
          extractors: [
            {
              extractor: (...args) => {
                return WindiIconExtractor.extractor(...args)
              },
              extensions: [...WindiIconExtractor.extensions, 'md'],
            },
          ],
        },
      },
    }),
  },
})

function safeColors() {
  return reduce(
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
            [] as string[]
          )
          acc.push(...withSecondaryDerivatives)
          return acc
        }, [] as string[])

        return [`bg-${variantName}`, `text-${variantName}`, ...iconColor]
      })

      colorVariants.forEach((variant) => {
        variant.forEach((v) => {
          acc.push(v)
        })
      })

      return acc
    },
    [] as string[]
  )
}
