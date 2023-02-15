const extractBodyPlugin = require('./extractBodyPlugin')

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
    extractBodyPlugin,
  ],
}
