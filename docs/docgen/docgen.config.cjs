/// @ts-check
const { defineConfig } = require('vue-docgen-cli')
const reactConfig = require('./docgen.config.react.cjs')
const vueConfig = require('./docgen.config.vue.cjs')
const props = require('./docgen.template.props.cjs')
const events = require('./docgen.template.events.cjs')
const slots = require('./docgen.template.slots.cjs')
const component = require('./docgen.template.component.cjs')
const header = require('./docgen.template.header.cjs')

module.exports = defineConfig({
  componentsRoot: 'components/',
  outDir: './docs/components',
  defaultExamples: true,
  templates: {
    header,
    component,
    props,
    events,
    slots,
  },
  ignore: [
    '**/*.rootstory.tsx',
    '**/*.cy.tsx',
    '**/node_modules/**/*',
    '**/Textbox/react/Textbox.tsx', // Temporarily excluded from auto-generation
  ],
  pages: [
    reactConfig, // if it is on 2 lines it's easier to comment out
    vueConfig, //
  ],
})
