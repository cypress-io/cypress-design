import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import sucrase from '@rollup/plugin-sucrase'
import { CyCSSVitePlugin } from '@cypress-design/css'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      exclude: '**/react/**/*',
    }),
    // to allow for both react and vue JSX to be used we do not use esbuild to compile JSX,
    // we use sucrase (about as fast)
    sucrase({
      jsxPragma: 'React.createElement',
      jsxFragmentPragma: 'React.Fragment',
      disableESTransforms: true,
      enableLegacyBabel5ModuleInterop: false,
      enableLegacyTypeScriptModuleInterop: false,
      production: false,
      transforms: ['typescript', 'jsx'],
      include: ['**/*.tsx'],
      exclude: '**/vue/**/*',
    }),
    CyCSSVitePlugin({
      scan: {
        include: [
          path.join(__dirname, 'components/**/*.vue'),
          path.join(__dirname, 'components/**/*.ts'),
          path.join(__dirname, 'components/**/*.tsx'),
        ],
      },
    }),
  ],
})
