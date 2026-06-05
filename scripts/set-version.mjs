import { execa } from 'execa'
import { promises as fs } from 'fs'
import { join } from 'path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const repoRoot = join(__dirname, '..')

/**
 * Resolve the latest published version of an external (non-workspace)
 * dependency from the npm registry.
 *
 * Yarn Berry split the legacy `yarn info <pkg>` (Yarn 1) — which queried the
 * npm registry — into two commands:
 *   - `yarn info <pkg>`     → now queries the local workspace, not npm.
 *   - `yarn npm info <pkg>` → registry lookup.
 *
 * With `--json`, Berry returns a single JSON object whose `version` field is
 * the latest published version, which is what we want here.
 */
async function getNpmRegistryVersion(dep) {
  const { stdout } = await execa('yarn', ['npm', 'info', dep, '--json'])
  const info = JSON.parse(stdout)
  return info.version
}

async function run() {
  // Yarn Berry replacement for Yarn 1's `yarn workspaces info`:
  //   `yarn workspaces list --json` emits newline-delimited JSON, one
  //   workspace per line as `{"location": "<rel-path>", "name": "<pkg>"}`.
  //   The list includes the repo root (location `.`); we keep it in the
  //   `versions` map for completeness but skip it when rewriting `*` deps
  //   below because the root's own dependencies aren't workspace-internal
  //   `*` references.
  const { stdout } = await execa('yarn', ['workspaces', 'list', '--json'])
  const workspaces = stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))

  // Build a name → version map by reading each workspace's package.json.
  const versions = {}
  for (const ws of workspaces) {
    const pkg = JSON.parse(
      await fs.readFile(join(repoRoot, ws.location, 'package.json')),
    )
    versions[ws.name] = pkg.version
  }

  // For every workspace, replace `*` versions in `dependencies` with a real
  // version: from the `versions` map for workspace-internal deps, from the
  // npm registry for external deps. Skip the root workspace (`location: '.'`).
  await Promise.all(
    workspaces.map(async (ws) => {
      if (ws.location === '.') return

      const pkgPath = join(repoRoot, ws.location, 'package.json')
      const pkg = JSON.parse(await fs.readFile(pkgPath))
      if (!pkg.dependencies) return

      const depsUpdated = []
      await Promise.all(
        Object.entries(pkg.dependencies).map(async ([dep, version]) => {
          if (version !== '*') return
          if (versions[dep]) {
            pkg.dependencies[dep] = `^${versions[dep]}`
          } else {
            const v = await getNpmRegistryVersion(dep)
            pkg.dependencies[dep] = `^${v}`
          }
          depsUpdated.push(dep)
        }),
      )

      if (depsUpdated.length === 0) return

      await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))

      console.log()
      console.log(ws.location.replace(/^components\//, ''))
      console.log(
        depsUpdated.reduce((acc, dep) => {
          acc[dep] = pkg.dependencies[dep]
          return acc
        }, {}),
      )
    }),
  )
}

run()
