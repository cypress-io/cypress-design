let path = require('path')
const webpackMerge = require('webpack-merge')
const webpackConfigBase = require('../../webpack-common')

const config = webpackMerge.smart(webpackConfigBase, {
  mode: 'development',
  resolve: {
    alias: {
      '@DS': path.resolve(__dirname, 'src'),
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.gql',
      '.graphql',
    ],
    modules: ['node_modules'],
  },
})

module.exports = (env, argv) => {
  return config
}
