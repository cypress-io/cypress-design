/**
 * @fileoverview list the imports you want to warn on and the docs to fix it
 * @author Bart Ledoux
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: `problem`, // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        'list the imports you want to warn on and the docs to fix it',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: false, // Or `code` or `whitespace`
    schema: [
      {
        type: 'array',
        additionalProperties: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
            import: { type: 'string' },
            docLink: { type: 'string' },
          },
          required: ['import', 'docLink'],
        },
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    const [deprecatedImports] = context.options

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        const importOptions = deprecatedImports.find((importToCheck) => {
          if (node.source.value.includes(importToCheck.import)) {
            return true
          }
        })

        if (!importOptions) {
          return
        }

        context.report({
          node: node.source,
          message: [
            `${
              importOptions.name ?? 'This component'
            } is deprecated as it does not use the design system.`,
            `Use this doc to replace it with the design system version`,
            `${importOptions.docLink}`,
          ].join('\n'),
        })
      },
    }
  },
}
