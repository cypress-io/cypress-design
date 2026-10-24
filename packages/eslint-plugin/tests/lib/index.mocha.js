'use strict'

const assert = require('assert')
const { ESLint } = require('eslint')
const plugin = require('../../lib')

describe('plugin', () => {
  it('exposes every rule and package metadata', () => {
    assert.deepStrictEqual(Object.keys(plugin.rules).sort(), [
      'deprecate-imports',
      'deprecate-imports-again',
      'no-windicss',
    ])
    assert.strictEqual(plugin.meta.name, '@cypress-design/eslint-plugin')
  })

  it('works as a flat config through configs.recommended', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [plugin.configs.recommended],
    })
    const [result] = await eslint.lintText("import 'virtual:windi.css'", {
      filePath: 'src/main.js',
    })
    assert.deepStrictEqual(
      result.messages.map((message) => message.ruleId),
      ['@cypress-design/no-windicss'],
    )
  })
})
