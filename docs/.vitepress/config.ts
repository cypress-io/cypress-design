import { HeadConfig, defineConfig } from 'vitepress'
import {
  CyCSSVitePlugin,
  WindiIconExtractor,
  colors,
} from '@cypress-design/css'
import { join, resolve } from 'path'
import _ from 'lodash'
import { globbySync } from 'globby'
import vueLiveMd from './vue-live-md-it'
import figmaLinkMd from './figma-link-md-it'

const { kebabCase, map, reduce } = _

// get the branch from vercel's build context
const branch = process.env.GIT_BRANCH || 'main'

// default dark mode preference to system preference
const fallbackPreference = 'auto'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Cypress Design System',
  description: 'The documentation website for building UI at Cypress',
  outDir: './dist',
  markdown: {
    config(md) {
      md.use(vueLiveMd)
      md.use(figmaLinkMd)
    },
  },
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = []

    if (pageData.frontmatter.title) {
      head.push([
        'meta',
        { property: 'og:title', content: pageData.frontmatter.title },
      ])
    }

    if (pageData.frontmatter.description) {
      head.push([
        'meta',
        {
          property: 'og:description',
          content: pageData.frontmatter.description,
        },
      ])
    }

    return head
  },
  head: [['link', { rel: 'shortcut icon', href: 'favicon.ico' }]],
  rewrites: {
    ...globbySync(['*.md'], { cwd: resolve(__dirname, '..') }).reduce(
      (acc, path) => {
        acc[path] = path.replace(/^\d+-/, '')
        return acc
      },
      {} as Record<string, string>
    ),
    '1-Getting-Started.md': 'index.md',
  },
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
        important: false,
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
