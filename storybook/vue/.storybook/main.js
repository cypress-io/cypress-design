const { mergeConfig } = require('vite');
const { CyCSSVitePlugin } = require('@cypress-design/css');
const path = require('path');
const vueJsx = require('@vitejs/plugin-vue-jsx').default;

module.exports = {
  stories: ['../../../components/*/vue/*.stories.@(mdx|tsx)'],
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
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      plugins: [
        CyCSSVitePlugin({
          scan: {
            include: [
              path.resolve(
                __dirname,
                '../../../components/*/vue/*.stories.@(mdx|tsx)'
              ),
              path.resolve(__dirname, '../../../components/*/vue/*.vue'),
            ],
          },
        }),
        // add management of jsx files
        vueJsx(),
      ],
      base: '/vue/',
    });
  },
};
