import { defineConfig } from 'vitepress'
import vueLiveMd from './vue-live-md-it'
import { resolve } from 'path'

const branch = process.env.GIT_BRANCH || 'main'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Cypress Design System',
  outDir: './dist',
  markdown: {
    config(md) {
      md.use(vueLiveMd)
    },
  },
  vite: {
    define: {
      'import.meta.env.EDIT_ROOT':
        process.env.NODE_ENV === 'development'
          ? JSON.stringify(`vscode://file/${resolve(__dirname, '../../')}`)
          : JSON.stringify(
              `https://github.com/cypress-io/cypress-design/blob/${branch}/`
            ),
    },
  },
})
