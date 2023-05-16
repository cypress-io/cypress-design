/**
 * @fileoverview list the imports you want to warn on and the docs to fix it
 * @author Bart Ledoux
 */
'use strict'

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
})

const options = [
  [
    {
      import: '@frontend-shared/components/Button.vue',
      docLink: 'https://design.cypress.io/components/vue/Button',
    },
  ],
]

ruleTester.run('deprecate-imports', rule, {
  valid: [
    {
      code: "import Button from '@cypress-design/vue-button'",
      options,
    },
  ],
  invalid: [
    {
      code: "import Button from '@frontend-shared/components/Button.vue'",
      errors: [
        {
          message: [
            'This component is deprecated as it does not use the design system.',
            'Use this doc to replace it with the design system version',
            'https://design.cypress.io/components/vue/Button',
          ].join('\n'),
        },
      ],
      options,
    },
  ],
})
