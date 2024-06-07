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
      url: 'https://github.com/cypress-io/cypress-design/blob/main/packages/eslint-plugin/docs/rules/deprecate-imports.md', // URL to the documentation page for this rule
    },
    fixable: false, // Or `code` or `whitespace`
    schema: [
      {
        type: 'array',
        additionalProperties: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the deprecated import',
            },
            source: {
              description:
                'RegExp or glob describing a way to match the deprecated import',
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
            docs: { type: 'string', description: 'URL to the documentation' },
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
      throw context.report({
        message: 'No deprecated imports provided',
      })
    }

    if (!Array.isArray(deprecatedImports)) {
      throw context.report({
        message: 'Rule accepts an array of import definitions',
      })
    }

    const emptyImport = deprecatedImports.find(
      (importToCheck) => !importToCheck.source,
    )

    if (emptyImport) {
      throw context.report({
        message: `No source provided for deprecated import ${JSON.stringify(
          emptyImport,
        )}`,
      })
    }

    const deprecatedImportsWithArraySource = deprecatedImports.map(
      (importToConvert) => {
        if (typeof importToConvert.source === 'string') {
          return { ...importToConvert, source: [importToConvert.source] }
        }
        return importToConvert
      },
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

        const importOptions = deprecatedImportsWithArraySource.filter(
          (importToCheck) => {
            return importToCheck.source.some((source) =>
              minimatch(fullSource, source),
            )
          },
        )

        if (!importOptions.length) {
          return
        }

        for (const option of importOptions) {
          if (option.specifiers?.length) {
            const hasDefault = option.specifiers.includes('default')
            const invalidSpecifiers = node.specifiers.filter(
              (specifier) =>
                (hasDefault && specifier.type === 'ImportDefaultSpecifier') ||
                option.specifiers.includes(specifier.imported.name),
            )
            if (invalidSpecifiers.length) {
              invalidSpecifiers.forEach((invalidSpecifier) => {
                context.report({
                  node: invalidSpecifier,
                  message: [
                    `${
                      option.name ?? 'This component'
                    } is deprecated as it does not use the design system.`,
                    ...(option.docs
                      ? [
                          `Use this doc to replace it with the official design system version`,
                          `${option.docs}`,
                        ]
                      : []),
                  ].join('\n'),
                })
              })
            }
          }
        }

        if (importOptions.some((option) => option.specifiers?.length)) {
          return
        }

        const [option] = importOptions

        context.report({
          node: node.source,
          message: [
            `${
              option.name ?? 'This component'
            } is deprecated as it does not use the design system.`,
            ...(option.docs
              ? [
                  `Use this doc to replace it with the official design system version`,
                  `${option.docs}`,
                ]
              : []),
          ].join('\n'),
        })
      },
    }
  },
}
