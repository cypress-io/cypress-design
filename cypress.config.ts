/* eslint-disable no-console */
import { defineConfig } from 'cypress'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import sucrase from '@rollup/plugin-sucrase'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'

export default defineConfig({
  projectId: '89d3nq',
  fixturesFolder: false,

  component: {
    setupNodeEvents(on) {
      on('task', {
        'a11y-table': function (message) {
          console.table(message)
          return null
        },
      })
    },
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
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
        ],
      },
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler())
    },
  },
})
