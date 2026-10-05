/**
 * Fail when a published package's build imports an `@cypress-design/*` package
 * it doesn't list in `dependencies` or `peerDependencies`.
 *
 * devDependencies are bundled into `dist/` unless the build marks them
 * external. Any `@cypress-design/*` import still in `dist/` was externalized,
 * so consumers have to install it, and npm never installs a package's
 * devDependencies. Reading `dist/` keeps this independent of how each build
 * config declares its externals. Run it after `yarn build:components`.
 */
import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import * as url from 'url'
import manypkg from '@manypkg/get-packages'
import { init, parse } from 'es-module-lexer'

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

export function checkPackage(pkg, imports) {
  const runtime = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ])
  const dev = new Set(Object.keys(pkg.devDependencies || {}))
  return [...new Set(imports)]
    .filter((dep) => dep !== pkg.name && !runtime.has(dep))
    .sort()
    .map((dep) => ({
      dependency: dep,
      reason: dev.has(dep) ? 'only in devDependencies' : 'not in dependencies',
    }))
}

const esmEntry = (pkg) => pkg.exports?.['.']?.import ?? pkg.module

function esmFiles(dir) {
  return readdirSync(dir, { recursive: true })
    .filter((file) => file.endsWith('.mjs'))
    .map((file) => join(dir, file))
}

async function main() {
  const { packages } = await getPackages(repoRoot)
  const problems = []
  const unbuilt = []
  for (const { dir, packageJson: pkg } of packages) {
    const entry = esmEntry(pkg)
    if (pkg.private || !entry) continue
    if (!existsSync(join(dir, entry))) {
      unbuilt.push(pkg.name)
      continue
    }
    const imports = []
    for (const file of esmFiles(join(dir, 'dist'))) {
      imports.push(...(await internalImports(readFileSync(file, 'utf8'))))
    }
    const found = checkPackage(pkg, imports)
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
      'Every @cypress-design/* import in dist/ is a runtime dependency.',
    )
    return
  }

  console.error(
    'These packages import an @cypress-design/* package from dist/ that\n' +
      'consumers never install:\n\n' +
      problems
        .map(
          ({ pkg, found }) =>
            `  ${pkg.name}\n` +
            found.map((f) => `    ${f.dependency}: ${f.reason}`).join('\n'),
        )
        .join('\n') +
      '\n\nMove each one to `dependencies` (as "*").',
  )
  process.exit(1)
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  main()
}
