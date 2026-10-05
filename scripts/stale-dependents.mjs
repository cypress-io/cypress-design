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
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import * as url from 'url'
import semver from 'semver'
import { isInternal, loadWorkspaces, repoRoot } from './workspaces.mjs'

const BUMPS = ['patch', 'minor', 'major']

const maxBump = (a, b) => (BUMPS.indexOf(a) >= BUMPS.indexOf(b) ? a : b)

export function parseChangeset(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const bumps = {}
  for (const line of match[1].split(/\r?\n/)) {
    const entry = line.match(
      /^\s*['"]?([^'":]+)['"]?\s*:\s*(major|minor|patch)\s*$/,
    )
    if (entry) bumps[entry[1].trim()] = entry[2]
  }
  return bumps
}

export function readPendingBumps(changesetDir) {
  if (!existsSync(changesetDir)) return {}
  const pending = {}
  for (const file of readdirSync(changesetDir)) {
    if (!file.endsWith('.md') || file === 'README.md') continue
    const bumps = parseChangeset(readFileSync(join(changesetDir, file), 'utf8'))
    for (const [name, bump] of Object.entries(bumps)) {
      pending[name] = pending[name] ? maxBump(pending[name], bump) : bump
    }
  }
  return pending
}

/**
 * Packages in a `fixed` group share the group's highest bump and version, the
 * way `changeset version` treats them.
 */
export function releaseVersions(workspaces, pending, fixed = []) {
  const local = Object.fromEntries(
    workspaces.map((ws) => [ws.name, ws.pkg.version]),
  )
  const next = {}
  for (const [name, version] of Object.entries(local)) {
    next[name] = pending[name] ? semver.inc(version, pending[name]) : version
  }
  for (const group of fixed) {
    const members = group.filter((name) => name in local)
    const bump = members.reduce(
      (acc, name) =>
        pending[name]
          ? acc
            ? maxBump(acc, pending[name])
            : pending[name]
          : acc,
      null,
    )
    if (!bump) continue
    const highest = members.map((name) => local[name]).sort(semver.rcompare)[0]
    for (const name of members) next[name] = semver.inc(highest, bump)
  }
  return next
}

/**
 * Skipped, because the next publish already fixes them:
 * - packages not on npm yet (their first publish writes a fresh range),
 * - packages whose local version differs from npm `latest` (already waiting
 *   to publish — e.g. right after a version PR merges),
 * - packages with a pending changeset of their own, or of their fixed group.
 *
 * `fetchLatest(name)` resolves to the `latest` manifest, or `null` when the
 * package isn't on npm.
 */
export async function findStaleDependents({
  workspaces,
  pending,
  fixed,
  fetchLatest,
}) {
  const byName = new Map(workspaces.map((ws) => [ws.name, ws]))
  const versions = releaseVersions(workspaces, pending, fixed)
  const isPublishedWorkspace = (name) =>
    byName.has(name) && !byName.get(name).pkg.private

  const candidates = workspaces.filter(
    (ws) => !ws.pkg.private && versions[ws.name] === ws.pkg.version,
  )
  const results = await Promise.all(
    candidates.map(async (ws) => {
      const internalDeps = Object.keys(ws.pkg.dependencies || {}).filter(
        (dep) => isInternal(dep) && isPublishedWorkspace(dep),
      )
      if (internalDeps.length === 0) return null

      const published = await fetchLatest(ws.name)
      if (!published) return null
      if (published.version !== ws.pkg.version) return null

      const stale = []
      for (const dep of internalDeps) {
        const range = published.dependencies?.[dep]
        const version = versions[dep]
        // Missing from the published manifest means the package gained the dep
        // locally, which only ships with a changeset of its own.
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
        ? { name: ws.name, version: ws.pkg.version, stale }
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

  const changesetDir = join(repoRoot, '.changeset')
  const config = JSON.parse(
    readFileSync(join(changesetDir, 'config.json'), 'utf8'),
  )
  const stalePackages = await findStaleDependents({
    workspaces: loadWorkspaces(),
    pending: readPendingBumps(changesetDir),
    fixed: config.fixed,
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
  writeFileSync(join(changesetDir, fileName), content)
  console.log(`Wrote .changeset/${fileName}:\n\n${formatReport(stalePackages)}`)
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err)
    process.exit(2)
  })
}
