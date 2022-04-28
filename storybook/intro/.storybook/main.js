const { CyCSSWebpackPlugin } = require('@cypress-design/css');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../stories/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // "@storybook/addon-interactions",
  ],
  framework: '@storybook/react',
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        react: {
          title: 'React',
          url: 'http://localhost:6008',
          expanded: true,
        },
        vue: {
          title: 'Vue',
          url: 'http://localhost:6007',
          expanded: true,
        },
      };
    }
    return {
      react: {
        title: 'React',
        url: '/react',
        expanded: true,
      },
      vue: {
        title: 'Vue',
        url: '/vue',
        expanded: true,
      },
    };
  },
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

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './stories/src/images',
            to: './img',
          },
        ],
      })
    );

    return config;
  },
  webpackFinal: async (config) => {
    config.plugins.push(
      CyCSSWebpackPlugin({
        scan: {
          include: [path.resolve(__dirname, '../stories/**/*.stories.mdx')],
        },
      })
    );
    return config;
  },
};
