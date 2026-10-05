/**
 * Internal runtime dependencies are `workspace:^<version>` so that Changesets
 * republishes a dependent when a dependency's release leaves its range, and
 * leaves it alone otherwise. This runs the real release plan against a fixture
 * using the repo's `.changeset/config.json`, so a Changesets upgrade that
 * changes either behavior fails here.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import * as url from 'url'
import applyReleasePlanModule from '@changesets/apply-release-plan'
import { read as readConfig } from '@changesets/config'
import getReleasePlanModule from '@changesets/get-release-plan'
import manypkg from '@manypkg/get-packages'

// CommonJS; depending on the build, the default import is either the export
// itself or the `module.exports` object.
const applyReleasePlan =
  applyReleasePlanModule.default ?? applyReleasePlanModule
const getReleasePlan = getReleasePlanModule.default ?? getReleasePlanModule
const { getPackages } = manypkg.getPackages ? manypkg : manypkg.default

const repoConfig = JSON.parse(
  readFileSync(
    url.fileURLToPath(new URL('../.changeset/config.json', import.meta.url)),
    'utf8',
  ),
)

let root

const writeJson = (path, value) => {
  mkdirSync(join(root, path, '..'), { recursive: true })
  writeFileSync(join(root, path), JSON.stringify(value, null, 2) + '\n')
}

const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'))

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'changesets-workspace-'))
  writeJson('package.json', {
    name: 'root',
    private: true,
    workspaces: ['packages/*'],
  })
  writeJson('packages/dep/package.json', { name: 'dep', version: '1.2.0' })
  writeJson('packages/app/package.json', {
    name: 'app',
    version: '1.0.0',
    dependencies: { dep: 'workspace:^1.2.0' },
  })
  writeJson('.changeset/config.json', {
    ...repoConfig,
    changelog: false,
    fixed: [],
  })
})

afterEach(() => rmSync(root, { recursive: true, force: true }))

const release = async (bump) => {
  writeFileSync(
    join(root, '.changeset/bump.md'),
    `---\n'dep': ${bump}\n---\n\nBump dep.\n`,
  )
  const plan = await getReleasePlan(root)
  const app = plan.releases.find((r) => r.name === 'app')
  return { plan, app: app && app.type !== 'none' ? app : undefined }
}

describe('Changesets with workspace:^ ranges', () => {
  it('releases a dependent when a major leaves its range', async () => {
    const { plan, app } = await release('major')
    expect(app).toMatchObject({ type: 'patch', newVersion: '1.0.1' })

    const packages = await getPackages(root)
    await applyReleasePlan(plan, packages, await readConfig(root, packages))
    expect(readJson('packages/app/package.json').dependencies).toEqual({
      dep: 'workspace:^2.0.0',
    })
  })

  it('leaves a dependent alone when a minor stays in its range', async () => {
    const { app } = await release('minor')
    expect(app).toBeUndefined()
  })
})
