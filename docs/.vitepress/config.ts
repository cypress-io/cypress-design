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
})
