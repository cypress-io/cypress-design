const { CyCSSWebpackPlugin } = require('@cypress-design/css');
const path = require('path');

module.exports = {
  stories: [
    '../../stories/**/*.stories.mdx',
    '../../../components/*/react/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // "@storybook/addon-interactions",
  ],
  framework: '@storybook/react',
  refs: {
    react: {
      title: 'Vue',
      url: process.env.VERCEL_URL
        ? process.env.VERCEL_URL + '/storybook-vue/storybook-static'
        : 'http://localhost:6007',
      expanded: true,
    },
  },
  framework: '@storybook/react',
  managerWebpack: (config) => {
    config.module.rules = [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: {
          // without this, storybook composition only works if the external storybook(s) are launched before the primary one
          // https://github.com/storybookjs/storybook/issues/13650#issuecomment-773375007
          loader: 'string-replace-loader',
          options: {
            search: /"type": "unknown"/g,
            replace: () => '"type": "server-checked"',
          },
        },
      },
      ...config.module.rules,
    ];
    return config;
  },
  webpackFinal: (config) => {
    config.plugins.push(
      CyCSSWebpackPlugin({
        scan: {
          include: [
            path.resolve(
              __dirname,
              '../../../components/*/react/*.stories.tsx'
            ),
          ],
        },
      })
    );
    return config;
  },
};
