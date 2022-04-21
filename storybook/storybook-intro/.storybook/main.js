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
    console.log('----');
    console.log(process.env.VERCEL_URL);
    return {
      react: {
        title: 'React',
        url: process.env.VERCEL_URL + '/react',
        expanded: true,
      },
      vue: {
        title: 'Vue',
        url: process.env.VERCEL_URL + '/vue',
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
    return config;
  },
};
