import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'

// Tailwind and PostCSS are picked up automatically via postcss.config.mjs at repo root.
// Token CSS (colors.css, tokens.css) is built separately and served from public/.

/** Strip the `live` modifier from code block language strings (e.g. `vue live` → `vue`). */
function remarkStripLive() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'code' && typeof node.lang === 'string') {
        node.lang = node.lang.replace(/\s*\blive\b\s*/g, '').trim() || undefined
      }
      if (node.children) node.children.forEach(visit)
    }
    visit(tree)
  }
}

export default defineConfig({
  integrations: [react(), vue(), mdx()],
  markdown: {
    remarkPlugins: [remarkStripLive],
  },
  vite: {
    server: {
      // Allow Vite to serve files from the monorepo root so component imports
      // (e.g. ../../components/Button/vue/Button.vue) resolve during dev and build.
      fs: { allow: ['..'] },
      watch: {
        // Also watch component docs outside the docs/ project root.
        ignored: ['!**/components/**'],
      },
    },
  },
})
