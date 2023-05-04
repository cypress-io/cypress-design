/**
 * @fileoverview list the imports you want to warn on and the docs to fix it
 * @author Bart Ledoux
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/cypress-design-deprecate-imports'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('cypress-design-deprecate-imports', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "import Button from '@frontend-shared/components/Button.vue'",
      errors: [{ message: 'Fill me in.', type: 'Me too' }],
    },
  ],
})
