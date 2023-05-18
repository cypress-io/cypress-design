/**
 * @fileoverview list the imports you want to warn on and the docs to fix it
 * @author Bart Ledoux
 */
'use strict'

const { default: resolve } = require('eslint-module-utils/resolve')
const { minimatch } = require('minimatch')

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
            source: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'array',
                  items: { type: 'string' },
                },
              ],
            },
            docs: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    const [deprecatedImports] = context.options

    if (!deprecatedImports) {
      throw new Error('No deprecated imports provided')
    }

    if (!Array.isArray(deprecatedImports)) {
      throw new Error('Deprecated imports accepts an array of options ')
    }

    const emptyImport = deprecatedImports.find(
      (importToCheck) => !importToCheck.source
    )

    if (emptyImport) {
      throw new Error(
        `No source provided for deprecated import ${JSON.stringify(
          emptyImport
        )}`
      )
    }

    const deprecatedImportsWithArraySource = deprecatedImports.map(
      (importToConvert) => {
        if (typeof importToConvert.source === 'string') {
          return { ...importToConvert, source: [importToConvert.source] }
        }
        return importToConvert
      }
    )

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        const fullSource = resolve(node.source.value, context)

        if (!fullSource) {
          return
        }

        const importOptions = deprecatedImportsWithArraySource.find(
          (importToCheck) => {
            return importToCheck.source.some((source) =>
              minimatch(fullSource, source)
            )
          }
        )

        if (!importOptions) {
          return
        }

        context.report({
          node: node.source,
          message: [
            `${
              importOptions.name ?? 'This component'
            } is deprecated as it does not use the design system.`,
            ...(importOptions.docs
              ? [
                  `Use this doc to replace it with the official design system version`,
                  `${importOptions.docs}`,
                ]
              : []),
          ].join('\n'),
        })
      },
    }
  },
}
