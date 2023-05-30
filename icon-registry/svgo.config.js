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
      },
    },
    moveDefsToEndPlugin,
    extractBodyPlugin,
  ],
}
