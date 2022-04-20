const { CyCSSWebpackPlugin } = require('@cypress-design/css');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../../components/*/react/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // "@storybook/addon-interactions",
  ],
  framework: '@storybook/react',
  webpackFinal: (config) => {
    config.plugins.push(
      CyCSSWebpackPlugin({
        scan: {
          include: [
            path.resolve(__dirname, '../../components/*/react/*.stories.tsx'),
          ],
        },
      })
    );
    return config;
  },
};
