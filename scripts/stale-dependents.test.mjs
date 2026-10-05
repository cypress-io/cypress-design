import { describe, it, expect } from 'vitest'
import {
  findStaleDependents,
  parseChangeset,
  releaseVersions,
  renderChangeset,
} from './stale-dependents.mjs'

const ICON = '@cypress-design/vue-icon'
const ACCORDION = '@cypress-design/vue-accordion'

const workspace = (name, version, dependencies = {}, extra = {}) => ({
  name,
  location: `components/${name}`,
  pkg: { name, version, dependencies, ...extra },
})

const workspaces = (accordionVersion = '1.0.0') => [
  workspace(ICON, '3.3.2'),
  workspace(ACCORDION, accordionVersion, { [ICON]: '*' }),
]

const registry = (manifests) => async (name) => manifests[name] ?? null

const run = ({ ws = workspaces(), pending = {}, manifests }) =>
  findStaleDependents({
    workspaces: ws,
    pending,
    fixed: [],
    fetchLatest: registry(manifests),
  })

describe('findStaleDependents', () => {
  it('ignores a dependent whose published range includes the current version', async () => {
    const stale = await run({
      manifests: {
        [ICON]: { version: '3.3.2' },
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.0.0' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('flags a dependent whose published range excludes the current version', async () => {
    const stale = await run({
      manifests: {
        [ICON]: { version: '3.3.2' },
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
    const stale = await run({ manifests: { [ICON]: { version: '3.3.2' } } })
    expect(stale).toEqual([])
  })

  it('skips a dependent whose local version is ahead of npm latest', async () => {
    const stale = await run({
      ws: workspaces('1.1.0'),
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^1.0.0' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('flags dependents of a pending major changeset', async () => {
    const stale = await run({
      pending: { [ICON]: 'major' },
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

  it('ignores a pending minor changeset, which ^ already covers', async () => {
    const stale = await run({
      pending: { [ICON]: 'minor' },
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.3.2' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('skips a dependent that already has a pending changeset', async () => {
    const stale = await run({
      pending: { [ICON]: 'major', [ACCORDION]: 'patch' },
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^3.3.2' } },
      },
    })
    expect(stale).toEqual([])
  })

  it('skips a dependent released by its fixed group', async () => {
    const REACT_ICON = '@cypress-design/react-icon'
    const REGISTRY = '@cypress-design/icon-registry'
    const stale = await findStaleDependents({
      workspaces: [
        workspace(REGISTRY, '3.3.2'),
        workspace(ICON, '3.3.2', { [REGISTRY]: '*' }),
        workspace(REACT_ICON, '3.3.2', { [REGISTRY]: '*' }),
      ],
      pending: { [ICON]: 'major' },
      fixed: [[REGISTRY, REACT_ICON, ICON]],
      fetchLatest: registry({
        [REACT_ICON]: {
          version: '3.3.2',
          dependencies: { [REGISTRY]: '^3.3.2' },
        },
      }),
    })
    expect(stale).toEqual([])
  })

  it('ignores devDependencies and private workspaces', async () => {
    const stale = await run({
      ws: [
        workspace(ICON, '3.3.2'),
        workspace(ACCORDION, '1.0.0', {}, { devDependencies: { [ICON]: '*' } }),
        workspace(
          '@cypress-design/constants-x',
          '1.0.0',
          { [ICON]: '*' },
          { private: true },
        ),
      ],
      manifests: {
        [ACCORDION]: { version: '1.0.0', dependencies: { [ICON]: '^1.0.0' } },
        '@cypress-design/constants-x': {
          version: '1.0.0',
          dependencies: { [ICON]: '^1.0.0' },
        },
      },
    })
    expect(stale).toEqual([])
  })
})

describe('releaseVersions', () => {
  it('applies a bump to every package in a fixed group', () => {
    const ws = [
      workspace('@cypress-design/icon-registry', '3.3.2'),
      workspace(ICON, '3.3.2'),
      workspace(ACCORDION, '1.0.0'),
    ]
    const versions = releaseVersions(
      ws,
      { '@cypress-design/icon-registry': 'major' },
      [['@cypress-design/icon-registry', ICON]],
    )
    expect(versions).toEqual({
      '@cypress-design/icon-registry': '4.0.0',
      [ICON]: '4.0.0',
      [ACCORDION]: '1.0.0',
    })
  })
})

describe('parseChangeset', () => {
  it('reads single- and double-quoted frontmatter entries', () => {
    expect(
      parseChangeset(
        `---\n'${ICON}': major\n"${ACCORDION}": patch\n---\n\nSummary`,
      ),
    ).toEqual({ [ICON]: 'major', [ACCORDION]: 'patch' })
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
    expect(first.content).toContain(`'${ACCORDION}': minor`)
    expect(first.content).toContain(`\`${ICON}\` ^1.0.0 → ^3.3.2`)
    expect(parseChangeset(first.content)).toEqual({ [ACCORDION]: 'minor' })
    expect(renderChangeset(stale).fileName).toBe(first.fileName)
  })
})
