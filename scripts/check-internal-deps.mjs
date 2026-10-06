/**
 * Check how published packages declare their `@cypress-design/*` runtime
 * dependencies.
 *
 * - Every one in `dependencies` is a `workspace:^<version>` range that
 *   includes the dependency's current version. Changesets bumps a dependent
 *   only when a release falls outside its range, and `*` never does, so a `*`
 *   dependent would stay on the old major on npm.
 * - Every `@cypress-design/*` import left in the built `dist/` is listed in
 *   `dependencies` or `peerDependencies`. devDependencies are bundled unless
 *   the build marks them external, and npm never installs a package's
 *   devDependencies. Reading `dist/` keeps this independent of how each build
 *   config declares its externals, so run it after `yarn build:components`.
 */
import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import * as url from 'url'
import manypkg from '@manypkg/get-packages'
import { init, parse } from 'es-module-lexer'
import semver from 'semver'

const repoRoot = url.fileURLToPath(new URL('..', import.meta.url))

// CommonJS; depending on the build, the default import is either the exports
// object or wraps it in `default`.
const { getPackages } = manypkg.getPackages ? manypkg : manypkg.default

const INTERNAL = /^@cypress-design\/[^/]+/

export async function internalImports(code) {
  await init
  const [imports] = parse(code)
  return imports.map((i) => i.n?.match(INTERNAL)?.[0]).filter(Boolean)
}

/**
 * `versions` maps each workspace package name to its current version.
 * `distImports` is `null` for a package without a build.
 */
export function checkPackage(pkg, versions, distImports) {
  const runtime = { ...pkg.dependencies, ...pkg.peerDependencies }
  const dev = pkg.devDependencies || {}
  const problems = []

  // Only `dependencies`: set-version.mjs resolves `workspace:` ranges there
  // before publish, so a `workspace:` peer would reach npm as-is.
  for (const [dep, range] of Object.entries(pkg.dependencies || {})) {
    if (!versions.has(dep)) continue
    const version = versions.get(dep)
    const expected = `workspace:^${version}`
    const spec = range.replace(/^workspace:/, '')
    if (!/^workspace:\^\d/.test(range) || !semver.validRange(spec)) {
      problems.push({
        dependency: dep,
        reason: `is "${range}", use "${expected}"`,
      })
    } else if (!semver.satisfies(version, spec)) {
      problems.push({
        dependency: dep,
        reason: `"${range}" doesn't include ${version}, use "${expected}"`,
      })
    }
  }

  for (const dep of new Set(distImports || [])) {
    if (dep === pkg.name || dep in runtime) continue
    problems.push({
      dependency: dep,
      reason:
        dep in dev
          ? 'imported from dist/ but only in devDependencies'
          : 'imported from dist/ but not in dependencies',
    })
  }

  return problems.sort((a, b) => a.dependency.localeCompare(b.dependency))
}

const esmEntry = (pkg) => pkg.exports?.['.']?.import ?? pkg.module

async function distImports(dir) {
  const imports = []
  for (const file of readdirSync(join(dir, 'dist'), { recursive: true })) {
    if (!file.endsWith('.mjs')) continue
    imports.push(
      ...(await internalImports(readFileSync(join(dir, 'dist', file), 'utf8'))),
    )
  }
  return imports
}

async function main() {
  const { packages } = await getPackages(repoRoot)
  const versions = new Map(
    packages.map(({ packageJson }) => [packageJson.name, packageJson.version]),
  )
  const problems = []
  const unbuilt = []
  for (const { dir, packageJson: pkg } of packages) {
    if (pkg.private) continue
    const entry = esmEntry(pkg)
    let imports = null
    if (entry) {
      if (!existsSync(join(dir, entry))) {
        unbuilt.push(pkg.name)
        continue
      }
      imports = await distImports(dir)
    }
    const found = checkPackage(pkg, versions, imports)
    if (found.length) problems.push({ pkg, found })
  }

  if (unbuilt.length) {
    console.error(
      `Build these packages before running this check:\n  ${unbuilt.join('\n  ')}`,
    )
    process.exit(2)
  }

  if (problems.length === 0) {
    console.log(
      'Every @cypress-design/* runtime dependency is declared correctly.',
    )
    return
  }

  console.error(
    'These packages declare @cypress-design/* runtime dependencies incorrectly:\n\n' +
      problems
        .map(
          ({ pkg, found }) =>
            `  ${pkg.name}\n` +
            found.map((f) => `    ${f.dependency} ${f.reason}`).join('\n'),
        )
        .join('\n'),
  )
  process.exit(1)
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  main()
}
