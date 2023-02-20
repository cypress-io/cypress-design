const { CyCSSWebpackPlugin } = require('@cypress-design/css')
const path = require('path')

module.exports = {
  stories: [
    '../**/*.stories.@(mdx|tsx)',
    '../../../components/*/react/*.stories.@(mdx|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/preset-scss',
    'storybook-addon-designs',
  ],
  features: { buildStoriesJson: true },
  framework: '@storybook/react',
  webpackFinal: (config) => {
    // allow support for mjs module in webpack
    config.module.rules.push({
      type: 'javascript/auto',
      test: /.+\.mjs$/,
    })
    config.resolve.extensions.push('.json')
    return config
  },
}
