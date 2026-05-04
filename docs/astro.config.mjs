import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'

// Tailwind and PostCSS are picked up automatically via postcss.config.mjs at repo root.
// Token CSS (colors.css, tokens.css) is built separately and served from public/.

export default defineConfig({
  // outDir and srcDir default to ./dist and ./src relative to this file's location.
  integrations: [
    react(),
    vue(),
    mdx(),
  ],
})
