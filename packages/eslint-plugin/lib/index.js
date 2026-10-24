/**
 * @fileoverview a plugin to help migration to @cypress-design
 * @author Bart Ledoux <bart@cypress.io>;
 */
'use strict'

const requireIndex = require('requireindex')
const { name, version } = require('../package.json')

const plugin = {
  meta: { name, version },
  rules: requireIndex(__dirname + '/rules'),
  configs: {},
}

// The config references the plugin object itself so consumers only need
// `...cypressDesign.configs.recommended` in their flat config.
plugin.configs.recommended = {
  name: '@cypress-design/recommended',
  plugins: { '@cypress-design': plugin },
  rules: {
    '@cypress-design/no-windicss': 'error',
  },
}

module.exports = plugin
