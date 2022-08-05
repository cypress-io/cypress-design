import { describe, expect, test, vi } from 'vitest'
import { getConfig } from './get-config'
import createPlugin from 'windicss/plugin'

describe('getConfig', () => {
  test('should return the correct config', () => {
    const { config } = getConfig({})
    const defaultPluginsLength = config.plugins?.length || 0
    expect(
      getConfig({
        config: {
          plugins: [createPlugin(vi.fn(), { name: 'test' })],
        },
      }).config.plugins
    ).toHaveLength(defaultPluginsLength + 1)
  })
})
