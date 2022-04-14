const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const process = require('process')
const globImporter = require('node-sass-globbing')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const rootDir = path.resolve(__dirname, '../../../..')
const frontendPkg = path.resolve(__dirname, '../..')

module.exports = async ({ config }) => {
  const storybookPath = path.resolve(__dirname, '..')
  const designSystemPath = path.join(frontendPkg, 'design-system')
  const reactPath = path.join(frontendPkg, 'react')
  const commonPath = path.join(rootDir, 'packages/common')
  const featureFlagsPath = path.join(rootDir, 'packages/feature-flags')

  const babelRule = config.module.rules[0]
  const babelLoader = babelRule.use[0]

  // Add support for loading TSX files
  babelRule.test = /\.(mjs|jsx?|tsx?)$/

  // Add babel plugins required to handle dashboard components
  babelLoader.options.plugins.unshift([
    require.resolve('@babel/plugin-transform-modules-commonjs'),
  ])
  // babelLoader.options.plugins.unshift([
  //   require.resolve('@babel/plugin-proposal-class-properties'),
  //   { loose: true },
  // ])
  babelLoader.options.plugins.unshift([
    require.resolve('@babel/plugin-proposal-optional-chaining'),
  ])
  babelLoader.options.plugins.unshift([
    require.resolve('@babel/plugin-proposal-decorators'),
    { legacy: true },
  ])

  babelLoader.options.presets = babelLoader.options.presets.filter(
    (f) => !(Array.isArray(f) ? f[0] : f).includes('preset-minify')
  )

  // Add support for transpiling typescript files
  babelLoader.options.presets.push(['@babel/typescript'])

  // Include dashboard and design system in load paths for babel
  babelRule.include.push(
    reactPath,
    storybookPath,
    featureFlagsPath,
    designSystemPath,
    commonPath
  )

  config.resolve.alias = {
    '~': path.resolve(__dirname, '../../dashboard/src'),
    '@DS': path.resolve(__dirname, '../../design-system/src')
  }

  config.plugins.push(
    new WindiCSSWebpackPlugin({
      root: path.resolve(__dirname, '../../..'),
    })
  )

  // SCSS (NON-MODULES)
  config.module.rules.push({
    test: /\.scss$/,
    exclude: /module\..*\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            compileType: 'icss',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            importer: globImporter,
            includePaths: [
              storybookPath,
              designSystemPath,
              path.resolve(__dirname, '../node_modules'),
              path.resolve(__dirname, '../../../node_modules'),
            ],
          },
        },
      },
    ],
  })

  // SCSS MODULES
  config.module.rules.push({
    test: /module\..*\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            importer: globImporter,
            includePaths: [
              storybookPath,
              designSystemPath,
              path.resolve(__dirname, '../node_modules'),
              path.resolve(__dirname, '../../../node_modules'),
            ],
          },
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  })

  config.plugins.push(
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './img',
      },
    ])
  )

  config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../stories'),
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  })

  config.resolve.extensions = [
    '.mdx',
    '.mjs',
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.json',
    '.gql',
    '.graphql',
    '.scss',
  ]

  if (process.env.DEBUG == 'webpack') {
    console.dir(config, { depth: null })
  }

  return config
}
