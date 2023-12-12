import { HeadConfig, defineConfig } from 'vitepress'
import { resolve } from 'path'
import _ from 'lodash'
import { globbySync } from 'globby'
import vueLiveMd from './vue-live-md-it'
import figmaLinkMd from './figma-link-md-it'

const { kebabCase, map, reduce } = _

// get the branch from vercel's build context
const branch = process.env.GIT_BRANCH || 'main'
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Cypress Design System',
  description: 'The documentation website for building UI at Cypress',
  outDir: './dist',
  appearance: false,
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
    ...globbySync(['*.md', 'patterns/*.md'], {
      cwd: resolve(__dirname, '..'),
    }).reduce(
      (acc, path) => {
        acc[path] = `/${path}`.replace(/\/\d+-/, '/').slice(1)
        return acc
      },
      {} as Record<string, string>,
    ),
    '1-Getting-Started.md': 'index.md',
  },
  vite: {
    define: {
      'import.meta.env.EDIT_ROOT_LOCAL': JSON.stringify(
        `/__open-in-editor?file=${encodeURIComponent(
          resolve(__dirname, '../../'),
        )}`,
      ),
      'import.meta.env.EDIT_ROOT_GITHUB': JSON.stringify(
        `https://github.com/cypress-io/cypress-design/blob/${branch}/`,
      ),
    },
  },
})
