import { describe, it, expect } from 'vitest'
import {
  checkWorkspace,
  externalsInConfig,
  externalsInSharedConfig,
  internalImports,
} from './check-external-deps.mjs'

const ICON = '@cypress-design/vue-icon'

describe('checkWorkspace', () => {
  const run = (pkg) =>
    checkWorkspace({
      name: '@cypress-design/vue-modal',
      pkg,
      imports: [ICON, '@cypress-design/constants-modal'],
      externals: ['vue', ICON],
    })

  it('flags an externalized import listed only in devDependencies', () => {
    expect(
      run({
        devDependencies: {
          [ICON]: '*',
          '@cypress-design/constants-modal': '*',
        },
      }),
    ).toEqual([{ dependency: ICON, reason: 'only in devDependencies' }])
  })

  it('passes when the externalized import is a dependency or peer', () => {
    expect(run({ dependencies: { [ICON]: '*' } })).toEqual([])
    expect(run({ peerDependencies: { [ICON]: '*' } })).toEqual([])
  })

  it('ignores bundled (non-external) devDependencies', () => {
    expect(
      run({
        dependencies: { [ICON]: '*' },
        devDependencies: { '@cypress-design/constants-modal': '*' },
      }),
    ).toEqual([])
  })
})

describe('config parsing', () => {
  it('reads baseExternal from the shared vue config', () => {
    const code = `
      // '@cypress-design/vue-commented-out'
      const baseExternal = [
        'vue',
        '@cypress-design/icon-registry',
        '@cypress-design/vue-icon',
      ]
      const other = ['@cypress-design/not-external']`
    expect(externalsInSharedConfig(code, 'baseExternal')).toEqual([
      '@cypress-design/icon-registry',
      '@cypress-design/vue-icon',
    ])
  })

  it('reads extra externals but not bundledPackages from a package config', () => {
    const code = `
      export default generateViteConfig({ name: 'Select' }, [
        '@cypress-design/vue-button',
      ], [
        dts({ bundledPackages: ['@cypress-design/constants-select'] }),
      ])`
    expect(externalsInConfig(code)).toEqual(['@cypress-design/vue-button'])
  })
})

describe('internalImports', () => {
  it('finds static, side-effect and dynamic imports, skipping subpaths', () => {
    const code = `
      import { IconX } from '@cypress-design/vue-icon'
      import '@cypress-design/css'
      const m = import('@cypress-design/vue-tooltip')
      import x from '@cypress-design/icon-registry/dist/x'
      import vue from 'vue'`
    expect(internalImports(code)).toEqual([
      ICON,
      '@cypress-design/css',
      '@cypress-design/vue-tooltip',
    ])
  })
})
