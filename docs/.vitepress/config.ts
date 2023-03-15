import { defineConfig } from 'vitepress'
import vueLiveMd from './vue-live-md-it'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  outDir: './dist',
  markdown: {
    config(md) {
      md.use(vueLiveMd)
    },
  },
  vite: {
    define: {
      'import.meta.env.DEV_ABSOLUTE_PATH':
        process.env.NODE_ENV === 'development'
          ? JSON.stringify(__dirname)
          : '""',
    },
  },
})
