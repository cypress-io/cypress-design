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
  languageOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
})

const options = [
  [
    {
      source: '**/deprecated*',
      docs: 'https://design.cypress.io/components/vue/Button',
    },
    {
      source: '**/old-design-system*',
      docs: 'https://design.cypress.io/components/vue/Alert',
      specifiers: ['Alert', 'default'],
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
    {
      code: "import { Tooltip as Alert, Checkbox } from './old-design-system.js'",
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
    {
      code: "import { Alert as Button, Tooltip } from './old-design-system.js'",
      errors: [
        {
          message: [
            'This component is deprecated as it does not use the design system.',
            'Use this doc to replace it with the official design system version',
            'https://design.cypress.io/components/vue/Alert',
          ].join('\n'),
        },
      ],
      options,
      filename,
    },
    {
      code: "import system from './old-design-system.js'",
      errors: [
        {
          message: [
            'This component is deprecated as it does not use the design system.',
            'Use this doc to replace it with the official design system version',
            'https://design.cypress.io/components/vue/Alert',
          ].join('\n'),
        },
      ],
      options,
      filename,
    },
  ],
})
