const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx", 
    "../../components/*/react/*.stories.tsx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  webpackFinal: (config) => {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
}
