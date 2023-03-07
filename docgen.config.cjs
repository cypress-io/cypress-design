/// @ts-check
const { defineConfig, defaultTemplates } = require('vue-docgen-cli')
const reactConfig = require('./docgen.config.react.cjs')
const vueConfig = require('./docgen.config.vue.cjs')
const props = require('./docgen.props.template.cjs')

module.exports = defineConfig({
  componentsRoot: 'components/',
  outDir: './docs/components',
  defaultExamples: true,
  templates: {
    props,
  },

  pages: [reactConfig, vueConfig],
})
