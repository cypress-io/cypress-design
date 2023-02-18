const { CyCSSWebpackPlugin, colors } = require('@cypress-design/css')
const { map, reduce, kebabCase } = require('lodash')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  stories: ['../stories/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
  ],
  framework: '@storybook/react',
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        react: {
          title: 'React',
          url: 'http://localhost:9995',
          expanded: true,
        },
        vue: {
          title: 'Vue',
          url: 'http://localhost:9996',
          expanded: true,
        },
        vueTailwind: {
          title: 'Vue Tailwind',
          url: 'http://localhost:9994',
          expanded: true,
        },
      }
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
      vueTailwind: {
        title: 'Vue Tailwind',
        url: '/vue-tailwind',
        expanded: true,
      },
    }
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
    ]

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './stories/src/images',
            to: './img',
          },
        ],
      })
    )

    return config
  },
  webpackFinal: async (config) => {
    config.plugins.push(
      CyCSSWebpackPlugin({
        scan: {
          include: [
            path.resolve(__dirname, '../stories/intro/*.stories.mdx'),
            path.resolve(__dirname, '../stories/src/*.tsx'),
          ],
        },
        safelist: reduce(
          { ...colors, transparent: { ONLY: true }, current: { ONLY: true } },
          (acc, variants, colorName) => {
            const name = kebabCase(colorName)

            return `${acc}
            ${map(variants, (_, k) => {
              if (k === 'DEFAULT') return ``
              const variantName = k === 'ONLY' ? name : `${name}-${k}`
              return `
                bg-${variantName}
                text-${variantName}
                before:bg-${variantName}
                before:text-${variantName}
                icon-light-${variantName}
                icon-dark-${variantName}
                icon-light-secondary-${variantName}
                icon-dark-secondary-${variantName}`
            }).join(' ')}`
          }
        ),
      })
    )
    config.module.rules.push(
      // allow support for mjs module in webpack
      {
        type: 'javascript/auto',
        test: /.+\.mjs$/,
      }
    )
    return config
  },
}
