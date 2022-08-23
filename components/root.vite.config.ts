import type { LibraryOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from '@rollup/plugin-babel'
import { WindiKeepRollupPlugin } from '@cypress-design/css'

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
          '@cypress-design/icon',
          '@cypress-design/details-animation',
        ],
        output: {
          // Provide global variables to use in the UMD build
          // Add external deps here
          globals: {
            vue: 'Vue',
            '@cypress-design/icon-registry': 'CyIconRegistry',
            '@cypress-design/icon': 'CyIcon',
            '@cypress-design/details-animation': 'CyDetailsAnimation',
          },
        },
        plugins: [
          babel({
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  useBuiltIns: 'usage',
                  targets: {
                    chrome: '64',
                    edge: '79',
                    firefox: '86',
                  },
                },
              ],
            ],
          }) as any,
        ],
      },
    },
    plugins: [WindiKeepRollupPlugin(), vue()],
  })
