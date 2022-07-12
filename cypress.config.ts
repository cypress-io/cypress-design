import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '89d3nq',
  fixturesFolder: false,
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
