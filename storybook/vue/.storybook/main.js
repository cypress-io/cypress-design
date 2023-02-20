const { mergeConfig } = require('vite')
const path = require('path')
const vueJsx = require('@vitejs/plugin-vue-jsx').default

module.exports = {
  stories: [
    '../**/*.stories.@(mdx|tsx)',
    '../../../components/*/vue/*.stories.@(mdx|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
  ],
  features: { buildStoriesJson: true },
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // return the customized config
    return mergeConfig(config, {
      plugins: [
        // add management of jsx files
        vueJsx(),
      ],
      base: '/vue/',
    })
  },
}
