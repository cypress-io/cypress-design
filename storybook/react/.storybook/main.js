const { CyCSSWebpackPlugin } = require('@cypress-design/css');
const path = require('path');

module.exports = {
  stories: ['../../../components/*/react/*.stories.@(mdx|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
  ],
  features: { buildStoriesJson: true },
  framework: '@storybook/react',
  webpackFinal: (config) => {
    config.plugins.push(
      CyCSSWebpackPlugin({
        scan: {
          include: [
            path.resolve(
              __dirname,
              '../../../components/*/react/*.stories.@(mdx|tsx)'
            ),
            path.resolve(__dirname, '../../../components/*/react/*.tsx'),
          ],
        },
      })
    );
    return config;
  },
};
