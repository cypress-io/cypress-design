import type { LibraryOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin as TailwindKeepRollupPlugin } from '@cypress-design/rollup-plugin-tailwind-keep'

export default (libConfig: LibraryOptions) =>
  defineConfig({
    build: {
      sourcemap: true,
      lib: {
        fileName: (format) =>
          `index.${format === 'es' ? 'es.mjs' : `${format}.js`}`,
        ...libConfig,
      },
      rollupOptions: {
        external: [
          'vue',
          '@cypress-design/icon-registry',
          '@cypress-design/vue-icon',
          '@cypress-design/details-animation',
        ],
        output: {
          // Provide global variables to use in the UMD build
          // Add external deps here
          globals: {
            vue: 'Vue',
            '@cypress-design/icon-registry': 'CyIconRegistry',
            '@cypress-design/vue-icon': 'CyIcon',
            '@cypress-design/details-animation': 'CyDetailsAnimation',
          },
        },
      },
    },
    plugins: [TailwindKeepRollupPlugin(), vue()],
  })
