'use strict'

const rule = require('../../../lib/rules/no-windicss'),
  RuleTester = require('eslint').RuleTester,
  typescriptParser = require('@typescript-eslint/parser')

const windiImport = (source) => ({
  messageId: 'windiImport',
  data: { source },
})
const windiColor = { messageId: 'windiColor' }

new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
}).run('no-windicss (imports)', rule, {
  valid: [
    "import '@cypress-design/css/dist/tokens.css'",
    "import { TailwindIconExtractor } from '@cypress-design/css'",
    "import tailwind from 'tailwindcss'",
    "import './windicss.css'",
    "import '../virtual:windi.css'",
    "import { isValidWindiColor } from './icon-extractor-tools'",
    "export * from '@cypress-design/vue-icon'",
    "const css = require('@cypress-design/css')",
    "resolve('windicss')",
  ],
  invalid: [
    {
      code: "import 'virtual:windi.css'",
      errors: [windiImport('virtual:windi.css')],
    },
    {
      code: "import 'virtual:windi-devtools'",
      errors: [windiImport('virtual:windi-devtools')],
    },
    {
      code: "import { defineConfig } from 'windicss/helpers'",
      errors: [windiImport('windicss/helpers')],
    },
    {
      code: "import WindiCSS from 'vite-plugin-windicss'",
      errors: [windiImport('vite-plugin-windicss')],
    },
    {
      code: "import { WindiPluginUtils } from '@windicss/plugin-utils'",
      errors: [windiImport('@windicss/plugin-utils')],
    },
    {
      code: "export { default } from 'windicss'",
      errors: [windiImport('windicss')],
    },
    {
      code: "export * from 'windicss/utils'",
      errors: [windiImport('windicss/utils')],
    },
    {
      code: "const load = () => import('virtual:windi.css')",
      errors: [windiImport('virtual:windi.css')],
    },
    {
      code: "const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')",
      errors: [windiImport('windicss-webpack-plugin')],
    },
  ],
})

new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    sourceType: 'module',
  },
}).run('no-windicss (WindiColor)', rule, {
  valid: [
    "import type { IconId } from '@cypress-design/vue-icon'",
    "const props: { strokeColor?: 'indigo-500' } = { strokeColor: 'indigo-500' }",
    'type WindiColors = string',
  ],
  invalid: [
    {
      code: "import type { WindiColor } from '@cypress-design/icon-registry'",
      errors: [windiColor],
    },
    {
      code: "import { WindiColor as Color } from '@cypress-design/icon-registry'",
      errors: [windiColor],
    },
    {
      code: "export type { WindiColor } from '@cypress-design/icon-registry'",
      errors: [windiColor],
    },
    {
      code: 'interface Props { strokeColor?: WindiColor; fillColor?: WindiColor }',
      errors: [windiColor, windiColor],
    },
    {
      code: "export type WindiColor = 'current' | 'indigo-500'",
      errors: [windiColor],
    },
  ],
})
