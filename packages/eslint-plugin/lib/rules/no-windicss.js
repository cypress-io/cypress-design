/**
 * @fileoverview disallow new WindiCSS imports and `WindiColor` references
 */
'use strict'

const WINDI_PACKAGE = /(^|[-/@])windicss($|[-/])/

function isWindiSource(source) {
  if (typeof source !== 'string' || /^[./]/.test(source)) {
    return false
  }
  return source.startsWith('virtual:windi') || WINDI_PACKAGE.test(source)
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow new WindiCSS imports and references to the `WindiColor` type',
      recommended: true,
      url: 'https://github.com/cypress-io/cypress-design/blob/main/packages/eslint-plugin/docs/rules/no-windicss.md',
    },
    schema: [],
    messages: {
      windiImport:
        'WindiCSS import `{{source}}` found. The design system has moved to Tailwind, so new WindiCSS code adds migration debt. Use Tailwind utilities and `@cypress-design/css` instead: https://design.cypress.io/install',
      windiColor:
        '`WindiColor` is a WindiCSS holdover from `@cypress-design/icon-registry` and is scheduled for removal. Pass a static color string (e.g. `strokeColor="indigo-500"`) instead of propagating the type.',
    },
  },

  create(context) {
    // TypeScript parsers give `import { WindiColor }` and `export { WindiColor }`
    // separate `imported`/`local` nodes with the same range, so dedupe by range.
    const reportedRanges = new Set()

    function checkSource(node) {
      if (node && node.type === 'Literal' && isWindiSource(node.value)) {
        context.report({
          node,
          messageId: 'windiImport',
          data: { source: node.value },
        })
      }
    }

    return {
      ImportDeclaration(node) {
        checkSource(node.source)
      },
      ExportNamedDeclaration(node) {
        checkSource(node.source)
      },
      ExportAllDeclaration(node) {
        checkSource(node.source)
      },
      ImportExpression(node) {
        checkSource(node.source)
      },
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require' &&
          node.arguments.length === 1
        ) {
          checkSource(node.arguments[0])
        }
      },
      Identifier(node) {
        if (node.name !== 'WindiColor') {
          return
        }
        const key = node.range.join(':')
        if (reportedRanges.has(key)) {
          return
        }
        reportedRanges.add(key)
        context.report({ node, messageId: 'windiColor' })
      },
    }
  },
}
