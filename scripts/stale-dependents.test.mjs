import { describe, it, expect } from 'vitest'
import { findStaleDependents, renderChangeset } from './stale-dependents.mjs'

const ICON = '@cypress-design/vue-icon'
const ACCORDION = '@cypress-design/vue-accordion'

const pkg = (name, version, dependencies = {}, extra = {}) => ({
  dir: `/repo/${name}`,
  packageJson: { name, version, dependencies, ...extra },
})

const packages = (accordionVersion = '1.0.0') => [
  pkg(ICON, '3.3.2'),
  pkg(ACCORDION, accordionVersion, { [ICON]: '*' }),
]

const release = (name, type, oldVersion, newVersion) => ({
  name,
  type,
  oldVersion,
  newVersion,
  changesets: [],
})

const registry = (manifests) => async (name) => manifests[name] ?? null

const run = ({ pkgs = packages(), releases = [], manifests }) =>
  findStaleDependents({
    packages: pkgs,
    releases,
    fetchLatest: registry(manifests),
  })

describe('findStaleDependents', () => {
  it('ignores a dependent whose published range includes the current version', async () => {
    const stale = await run({
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.0.0' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('flags a dependent whose published range excludes the current version', async () => {
    const stale = await run({
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^1.0.0' } },
      },
    })
    expect(stale).toEqual([
      {
        name: ACCORDION,
        version: '1.0.0',
        stale: [
          {
            dependency: ICON,
            range: '^1.0.0',
            version: '3.3.2',
            newRange: '^3.3.2',
          },
        ],
      },
    ])
  })

  it('skips a dependent that is not on npm yet', async () => {
    const stale = await run({ manifests: {} })
    expect(stale).toEqual([])
  })

  it('skips a dependent whose local version is ahead of npm latest', async () => {
    const stale = await run({
      pkgs: packages('1.1.0'),
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^1.0.0' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('flags dependents of a pending major', async () => {
    const stale = await run({
      releases: [release(ICON, 'major', '3.3.2', '4.0.0')],
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.3.2' } },
      },
    })
    expect(stale).toHaveLength(1)
    expect(stale[0].stale[0]).toMatchObject({
      dependency: ICON,
      range: '^3.3.2',
      version: '4.0.0',
      newRange: '^4.0.0',
    })
  })

  it('ignores a pending minor, which ^ already covers', async () => {
    const stale = await run({
      releases: [release(ICON, 'minor', '3.3.2', '3.4.0')],
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.3.2' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('skips a dependent that is in the release plan', async () => {
    const stale = await run({
      releases: [
        release(ICON, 'major', '3.3.2', '4.0.0'),
        release(ACCORDION, 'patch', '1.0.0', '1.0.1'),
      ],
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.3.2' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('ignores devDependencies and private packages', async () => {
    const stale = await run({
      pkgs: [
        pkg(ICON, '3.3.2'),
        pkg(ACCORDION, '1.0.0', {}, { devDependencies: { [ICON]: '*' } }),
        pkg(
          '@cypress-design/private-x',
          '1.0.0',
          { [ICON]: '*' },
          { private: true },
        ),
      ],
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^1.0.0' } },
        '@cypress-design/private-x': {
          version: '1.0.0',
          dependencies: { [ICON]: '^1.0.0' },
        },
      },
    })
    expect(stale).toEqual([])
  })
})

describe('renderChangeset', () => {
  it('bumps each package minor and names the file by content hash', () => {
    const stale = [
      {
        name: ACCORDION,
        version: '1.0.0',
        stale: [
          {
            dependency: ICON,
            range: '^1.0.0',
            version: '3.3.2',
            newRange: '^3.3.2',
          },
        ],
      },
    ]
    const first = renderChangeset(stale)
    expect(first.fileName).toMatch(/^auto-stale-dependents-[0-9a-f]{8}\.md$/)
    expect(first.content.startsWith(`---\n'${ACCORDION}': minor\n---\n`)).toBe(
      true,
    )
    expect(first.content).toContain(`\`${ICON}\` ^1.0.0 → ^3.3.2`)
    expect(renderChangeset(stale).fileName).toBe(first.fileName)
  })
})
