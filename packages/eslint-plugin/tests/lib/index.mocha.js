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

  it('marks the deprecate-imports rules as deprecated, and only them', () => {
    const deprecated = Object.entries(plugin.rules)
      .filter(([, rule]) => rule.meta.deprecated)
      .map(([name]) => name)
      .sort()
    assert.deepStrictEqual(deprecated, [
      'deprecate-imports',
      'deprecate-imports-again',
    ])
    assert.deepStrictEqual(
      plugin.rules['deprecate-imports'].meta.deprecated.replacedBy.map(
        ({ rule }) => rule.name,
      ),
      ['no-restricted-imports'],
    )
  })

  it('leaves deprecated rules out of configs.recommended', () => {
    const enabled = Object.keys(plugin.configs.recommended.rules).map((id) =>
      id.replace('@cypress-design/', ''),
    )
    for (const name of enabled) {
      assert.ok(!plugin.rules[name].meta.deprecated, `${name} is deprecated`)
    }
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
