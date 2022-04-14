const webpackConfig = require('./webpack.config')('development', {})

export default {
  projectId: 'jeqb3c',
  component: {
    supportFile: 'cypress/support/component.ts',
    specPattern: 'src/**/*spec.{js,jsx,ts,tsx}',
    viewportWidth: 500,
    viewportHeight: 300,
    // setupNodeEvents,
    devServer(cypressConfig) {
      const { startDevServer } = require('@cypress/webpack-dev-server')
      return startDevServer({ options: cypressConfig, webpackConfig })
    },
  },
}
