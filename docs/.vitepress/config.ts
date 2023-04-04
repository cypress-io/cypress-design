import { defineConfig } from 'vitepress'
import vueLiveMd from './vue-live-md-it'
import { resolve } from 'path'
import { APPEARANCE_KEY } from './theme/utils/useAppearance'

const branch = process.env.GIT_BRANCH || 'main'

const fallbackPreference = 'auto'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

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
  },
})
