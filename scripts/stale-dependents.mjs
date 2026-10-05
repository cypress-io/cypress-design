/**
 * Find published packages whose npm range for an internal dependency no
 * longer includes that dependency's version.
 *
 * Internal deps are declared as `*` and `set-version.mjs` rewrites each one to
 * `^<current version>` right before publish, so the range in every npm tarball
 * is frozen at that package's last publish. Changesets never bumps a `*`
 * dependent (`*` always "satisfies"), so when a dependency ships a major its
 * dependents keep resolving the old major on npm until something else
 * republishes them. Minor and patch releases are already picked up through
 * `^`, so only an out-of-range version counts.
 *
 *   node scripts/stale-dependents.mjs --check   # exit 1 and list them (PR CI)
 *   node scripts/stale-dependents.mjs --write   # add a changeset bumping them (release)
 */
import { createHash } from 'crypto'
import { writeFileSync } from 'fs'
import { join } from 'path'
import * as url from 'url'
import getReleasePlanModule from '@changesets/get-release-plan'
import manypkg from '@manypkg/get-packages'
import semver from 'semver'

const repoRoot = url.fileURLToPath(new URL('..', import.meta.url))

// Both are CommonJS; depending on the build, the default import is either the
// export itself or the `module.exports` object.
const getReleasePlan = getReleasePlanModule.default ?? getReleasePlanModule
const { getPackages } = manypkg.getPackages ? manypkg : manypkg.default

/**
 * Skipped, because the next publish already fixes them:
 * - packages not on npm yet (their first publish writes a fresh range),
 * - packages whose local version differs from npm `latest` (already waiting
 *   to publish — e.g. right after a version PR merges),
 * - packages in the release plan, including through a `fixed` group.
 *
 * `releases` is the release plan from `@changesets/get-release-plan`.
 * `fetchLatest(name)` resolves to the `latest` manifest, or `null` when the
 * package isn't on npm.
 */
export async function findStaleDependents({ packages, releases, fetchLatest }) {
  const published = packages
    .map((p) => p.packageJson)
    .filter((pkg) => !pkg.private)
  const versions = new Map(published.map((pkg) => [pkg.name, pkg.version]))
  const releasing = new Set()
  for (const release of releases) {
    if (release.type === 'none') continue
    releasing.add(release.name)
    versions.set(release.name, release.newVersion)
  }

  const results = await Promise.all(
    published
      .filter((pkg) => !releasing.has(pkg.name))
      .map(async (pkg) => {
        const internalDeps = Object.keys(pkg.dependencies || {}).filter((dep) =>
          versions.has(dep),
        )
        if (internalDeps.length === 0) return null

        const latest = await fetchLatest(pkg.name)
        if (!latest || latest.version !== pkg.version) return null

        const stale = []
        for (const dep of internalDeps) {
          const range = latest.dependencies?.[dep]
          const version = versions.get(dep)
          // Missing from the published manifest means the package gained the
          // dep locally, which only ships with a changeset of its own.
          if (!range) continue
          if (!semver.satisfies(version, range, { includePrerelease: true })) {
            stale.push({
              dependency: dep,
              range,
              version,
              newRange: `^${version}`,
            })
          }
        }
        return stale.length
          ? { name: pkg.name, version: pkg.version, stale }
          : null
      }),
  )
  return results.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name))
}

// Named by a content hash so repeated release runs rewrite the same file
// instead of piling up.
export function renderChangeset(stalePackages) {
  const frontmatter = stalePackages
    .map((pkg) => `'${pkg.name}': minor`)
    .join('\n')
  const lines = stalePackages.flatMap((pkg) =>
    pkg.stale.map(
      (s) =>
        `- \`${pkg.name}\`: \`${s.dependency}\` ${s.range} → ${s.newRange}`,
    ),
  )
  const content = `---
${frontmatter}
---

Republish against the current major of internal dependencies. The published
dependency range no longer included the version those dependencies are at:

${lines.join('\n')}
`
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 8)
  return { fileName: `auto-stale-dependents-${hash}.md`, content }
}

export function formatReport(stalePackages) {
  return stalePackages
    .map(
      (pkg) =>
        `  ${pkg.name}@${pkg.version}\n` +
        pkg.stale
          .map(
            (s) =>
              `    ${s.dependency}: published ${s.range} does not include ${s.version}`,
          )
          .join('\n'),
    )
    .join('\n')
}

async function fetchLatestFromRegistry(name) {
  const registry = (
    process.env.NPM_CONFIG_REGISTRY || 'https://registry.npmjs.org'
  ).replace(/\/$/, '')
  const res = await fetch(`${registry}/${name}/latest`)
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`npm registry returned ${res.status} for ${name}`)
  }
  return res.json()
}

async function main() {
  const mode = process.argv[2]
  if (mode !== '--check' && mode !== '--write') {
    console.error('Usage: node scripts/stale-dependents.mjs --check|--write')
    process.exit(2)
  }

  const { packages } = await getPackages(repoRoot)
  const { releases } = await getReleasePlan(repoRoot)
  const stalePackages = await findStaleDependents({
    packages,
    releases,
    fetchLatest: fetchLatestFromRegistry,
  })

  if (stalePackages.length === 0) {
    console.log('No published package has an out-of-range internal dependency.')
    return
  }

  if (mode === '--check') {
    console.error(
      `These packages are on npm with a range that excludes the version an internal dependency is releasing:\n\n${formatReport(stalePackages)}\n\n` +
        'Add a changeset that bumps each of them (minor is enough) so they republish with the new range,\n' +
        'or run `node scripts/stale-dependents.mjs --write` to generate one.',
    )
    process.exit(1)
  }

  const { fileName, content } = renderChangeset(stalePackages)
  writeFileSync(join(repoRoot, '.changeset', fileName), content)
  console.log(`Wrote .changeset/${fileName}:\n\n${formatReport(stalePackages)}`)
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err)
    process.exit(2)
  })
}
