/// @ts-check
const { defineConfig } = require('vue-docgen-cli')
const reactConfig = require('./docgen.config.react.cjs')
const vueConfig = require('./docgen.config.vue.cjs')
const props = require('./docgen.template.props.cjs')
const component = require('./docgen.template.component.cjs')

module.exports = defineConfig({
  componentsRoot: 'components/',
  outDir: './docs/components',
  defaultExamples: true,
  templates: {
    component,
    props,
  },
  ignore: ['**/*.rootstory.tsx', '**/*.cy.tsx'],
  pages: [reactConfig, vueConfig],
})
