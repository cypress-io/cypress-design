import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { CyCSSVitePlugin } from '@cypress-design/css'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    CyCSSVitePlugin({
      scan: {
        include: ['/src/**/*.@(vue|tsx|ts)'],
      },
    }),
  ],
})
