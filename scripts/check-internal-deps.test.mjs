import { describe, it, expect } from 'vitest'
import { checkPackage, internalImports } from './check-internal-deps.mjs'

const ICON = '@cypress-design/vue-icon'
const MODAL = '@cypress-design/vue-modal'
const versions = new Map([
  [ICON, '3.3.2'],
  [MODAL, '1.0.0'],
])

describe('checkPackage ranges', () => {
  it('passes a workspace:^ range that includes the current version', () => {
    const pkg = { name: MODAL, dependencies: { [ICON]: 'workspace:^3.0.0' } }
    expect(checkPackage(pkg, versions, null)).toEqual([])
  })

  it('flags a * range', () => {
    const pkg = { name: MODAL, dependencies: { [ICON]: '*' } }
    expect(checkPackage(pkg, versions, null)).toEqual([
      { dependency: ICON, reason: 'is "*", use "workspace:^3.3.2"' },
    ])
  })

  it('flags a workspace range without a version', () => {
    const pkg = { name: MODAL, dependencies: { [ICON]: 'workspace:^' } }
    expect(checkPackage(pkg, versions, null)).toHaveLength(1)
  })

  it('flags a workspace range that excludes the current version', () => {
    const pkg = { name: MODAL, dependencies: { [ICON]: 'workspace:^1.0.0' } }
    expect(checkPackage(pkg, versions, null)).toEqual([
      {
        dependency: ICON,
        reason:
          '"workspace:^1.0.0" doesn\'t include 3.3.2, use "workspace:^3.3.2"',
      },
    ])
  })

  it('leaves peerDependencies ranges alone', () => {
    const pkg = { name: MODAL, peerDependencies: { [ICON]: '^3.0.0' } }
    expect(checkPackage(pkg, versions, null)).toEqual([])
  })

  it('ignores devDependencies and non-workspace packages', () => {
    const pkg = {
      name: MODAL,
      dependencies: { clsx: '*' },
      devDependencies: { [ICON]: '*' },
    }
    expect(checkPackage(pkg, versions, null)).toEqual([])
  })
})

describe('checkPackage dist imports', () => {
  const declared = { [ICON]: 'workspace:^3.3.2' }

  it('flags a dist import listed only in devDependencies', () => {
    const pkg = { name: MODAL, devDependencies: { [ICON]: '*' } }
    expect(checkPackage(pkg, versions, [ICON])).toEqual([
      {
        dependency: ICON,
        reason: 'imported from dist/ but only in devDependencies',
      },
    ])
  })

  it('flags a dist import that is not listed at all', () => {
    expect(checkPackage({ name: MODAL }, versions, [ICON])).toEqual([
      {
        dependency: ICON,
        reason: 'imported from dist/ but not in dependencies',
      },
    ])
  })

  it('passes when the dist import is a dependency or peer', () => {
    expect(
      checkPackage({ name: MODAL, dependencies: declared }, versions, [ICON]),
    ).toEqual([])
    expect(
      checkPackage({ name: MODAL, peerDependencies: declared }, versions, [
        ICON,
      ]),
    ).toEqual([])
  })

  it('ignores a package importing itself', () => {
    expect(checkPackage({ name: MODAL }, versions, [MODAL])).toEqual([])
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
