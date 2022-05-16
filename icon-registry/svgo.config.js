const extractBodyPlugin = require('./extractBodyPlugin');

module.exports = {
  plugins: [
    {
      name: 'preset-default',
    },
    extractBodyPlugin,
  ],
};
