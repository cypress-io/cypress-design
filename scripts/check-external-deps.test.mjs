import { describe, it, expect } from 'vitest'
import { checkPackage, internalImports } from './check-external-deps.mjs'

const ICON = '@cypress-design/vue-icon'
const MODAL = '@cypress-design/vue-modal'

describe('checkPackage', () => {
  it('flags a dist import listed only in devDependencies', () => {
    expect(
      checkPackage({ name: MODAL, devDependencies: { [ICON]: '*' } }, [ICON]),
    ).toEqual([{ dependency: ICON, reason: 'only in devDependencies' }])
  })

  it('flags a dist import that is not listed at all', () => {
    expect(checkPackage({ name: MODAL }, [ICON])).toEqual([
      { dependency: ICON, reason: 'not in dependencies' },
    ])
  })

  it('passes when the dist import is a dependency or peer', () => {
    expect(
      checkPackage({ name: MODAL, dependencies: { [ICON]: '*' } }, [ICON]),
    ).toEqual([])
    expect(
      checkPackage({ name: MODAL, peerDependencies: { [ICON]: '*' } }, [ICON]),
    ).toEqual([])
  })

  it('ignores a package importing itself', () => {
    expect(checkPackage({ name: MODAL }, [MODAL])).toEqual([])
  })
})

describe('internalImports', () => {
  it('finds static, re-export and dynamic imports, reduced to package names', async () => {
    const code = `
      import { IconX } from '@cypress-design/vue-icon'
      export { a } from '@cypress-design/vue-tooltip'
      const m = import('@cypress-design/icon-registry/dist/x')
      import vue from 'vue'`
    expect(await internalImports(code)).toEqual([
      ICON,
      '@cypress-design/vue-tooltip',
      '@cypress-design/icon-registry',
    ])
  })
})
