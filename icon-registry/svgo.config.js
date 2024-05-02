const hashSum = require('hash-sum')
const extractBodyPlugin = require('./svgo-plugins/extractBodyPlugin')
const moveDefsToEndPlugin = require('./svgo-plugins/moveDefsToEnd')

module.exports = {
  plugins: [
    {
      name: 'preset-default',
    },
    {
      name: 'prefixIds',
      params: {
        prefixClassNames: false,
        delim: '',
        prefix: (el, ctx) => {
          return `cy-svg-${hashSum(ctx.path)}`
        },
      },
    },
    moveDefsToEndPlugin,
    extractBodyPlugin,
  ],
}
