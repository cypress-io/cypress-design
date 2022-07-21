import type { LibraryOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiKeepRollupPlugin from './windi-keep-rollup-plugin'

export default (libConfig: LibraryOptions) =>
  defineConfig({
    build: {
      sourcemap: true,
      lib: {
        fileName: (format) => `index.${format}.js`,
        ...libConfig,
      },
      rollupOptions: {
        external: ['vue', '@cypress-design/icon-registry'],
        output: {
          // Provide global variables to use in the UMD build
          // Add external deps here
          globals: {
            vue: 'Vue',
            '@cypress-design/icon-registry': 'IconRegistry',
          },
        },
      },
    },
    plugins: [WindiKeepRollupPlugin(), vue()],
  })
