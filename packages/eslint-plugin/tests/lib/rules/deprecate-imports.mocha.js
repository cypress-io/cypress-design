/**
 * @fileoverview list the imports you want to warn on and the docs to fix it
 * @author Bart Ledoux
 */
'use strict'

const path = require('path')

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/deprecate-imports'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': 'typescript',
  },
})

const options = [
  [
    {
      source: '**/deprecated*',
      docs: 'https://design.cypress.io/components/vue/Button',
    },
  ],
]

const filename = path.join(__dirname, '..', '..', 'files', 'noop.js')

ruleTester.run('deprecate-imports', rule, {
  valid: [
    {
      code: "import Button from '@cypress-design/vue-button'",
      options,
      filename,
    },
  ],
  invalid: [
    {
      code: "import Button from './deprecated-import.js'",
      errors: [
        {
          message: [
            'This component is deprecated as it does not use the design system.',
            'Use this doc to replace it with the official design system version',
            'https://design.cypress.io/components/vue/Button',
          ].join('\n'),
        },
      ],
      options,
      filename,
    },
  ],
})
