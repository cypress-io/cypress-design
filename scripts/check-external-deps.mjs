/**
 * Fail when a published package imports an `@cypress-design/*` package that
 * its build externalizes but lists only in `devDependencies`.
 *
 * devDependencies are bundled into `dist/` — unless the build marks them
 * external, in which case `dist/` keeps a bare `import` that consumers can't
 * resolve, because npm never installs a package's devDependencies.
 *
 * Externals come from the shared build configs (`baseExternal` in
 * `components/vue.vite.config.ts`, `external` in
 * `components/react.rollup.config.mjs`) plus any `@cypress-design/*` literal
 * a package's own `vite.config.ts` / `rollup.config.mjs` adds. React rollup
 * configs also externalize `Object.keys(pkg.dependencies)`, which can't cause
 * this bug and isn't modelled.
 *
 *   node scripts/check-external-deps.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import * as url from 'url'
import { isInternal, loadWorkspaces, repoRoot } from './workspaces.mjs'

const SHARED_CONFIGS = [
  {
    importPattern: /vue\.vite\.config/,
    file: 'components/vue.vite.config.ts',
    array: 'baseExternal',
  },
  {
    importPattern: /react\.rollup\.config/,
    file: 'components/react.rollup.config.mjs',
    array: 'external',
  },
]
const BUILD_CONFIGS = [
  'vite.config.ts',
  'rollup.config.mjs',
  'rollup.config.js',
]
const SOURCE_EXT = /\.(m?[jt]sx?|vue)$/
const SKIP_FILE = /\.(cy|test|spec|stories)\.|\.d\.ts$/
const SKIP_DIR = new Set(['node_modules', 'dist', 'bin', '__snapshots__'])

const stripComments = (code) =>
  code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

const internalLiterals = (code) =>
  [...code.matchAll(/['"](@cypress-design\/[\w.-]+)['"]/g)].map((m) => m[1])

/**
 * `@cypress-design/*` names a build config externalizes on its own. Literals
 * inside `bundledPackages: [...]` (vite-plugin-dts) are inlined, not external.
 */
export function externalsInConfig(code) {
  return internalLiterals(
    stripComments(code).replace(/bundledPackages\s*:\s*\[[^\]]*\]/g, ''),
  )
}

/**
 * The `@cypress-design/*` literals in `const <name> = [...]` or
 * `<name>: [...]` of a shared config.
 */
export function externalsInSharedConfig(code, arrayName) {
  const match = stripComments(code).match(
    new RegExp(`${arrayName}\\s*[:=]\\s*\\[([^\\]]*)\\]`),
  )
  return match ? internalLiterals(match[1]) : []
}

/**
 * Bare `@cypress-design/*` specifiers imported by a source file. Rollup and
 * vite match string externals against the exact specifier, so a subpath
 * import (`pkg/sub`) is bundled and doesn't count.
 */
export function internalImports(code) {
  const specifiers = [
    ...code.matchAll(
      /\b(?:from|import)\s*\(?\s*['"](@cypress-design\/[^'"]+)['"]/g,
    ),
  ].map((m) => m[1])
  return specifiers.filter((s) => s.split('/').length === 2)
}

/**
 * Problems for one workspace: imports that are external but not a runtime
 * dependency.
 */
export function checkWorkspace({ name, pkg, imports, externals }) {
  const runtime = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ])
  const dev = new Set(Object.keys(pkg.devDependencies || {}))
  return [...new Set(imports)]
    .filter((dep) => isInternal(dep) && dep !== name)
    .filter((dep) => externals.includes(dep) && !runtime.has(dep))
    .sort()
    .map((dep) => ({
      dependency: dep,
      reason: dev.has(dep) ? 'only in devDependencies' : 'not in dependencies',
    }))
}

function sourceFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIR.has(entry)) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...sourceFiles(full))
    else if (
      SOURCE_EXT.test(entry) &&
      !SKIP_FILE.test(entry) &&
      !BUILD_CONFIGS.includes(entry)
    ) {
      files.push(full)
    }
  }
  return files
}

function workspaceExternals(dir) {
  const externals = []
  for (const configFile of BUILD_CONFIGS) {
    const path = join(dir, configFile)
    if (!existsSync(path)) continue
    const code = readFileSync(path, 'utf8')
    externals.push(...externalsInConfig(code))
    for (const shared of SHARED_CONFIGS) {
      if (!shared.importPattern.test(code)) continue
      externals.push(
        ...externalsInSharedConfig(
          readFileSync(join(repoRoot, shared.file), 'utf8'),
          shared.array,
        ),
      )
    }
  }
  return externals
}

function main() {
  const problems = []
  for (const ws of loadWorkspaces()) {
    if (ws.pkg.private) continue
    const dir = join(repoRoot, ws.location)
    const imports = sourceFiles(dir).flatMap((file) =>
      internalImports(readFileSync(file, 'utf8')),
    )
    const found = checkWorkspace({
      name: ws.name,
      pkg: ws.pkg,
      imports,
      externals: workspaceExternals(dir),
    })
    if (found.length) problems.push({ ws, found })
  }

  if (problems.length === 0) {
    console.log(
      'Every externalized @cypress-design/* import is a runtime dependency.',
    )
    return
  }

  console.error(
    'These packages import an @cypress-design/* package their build keeps external,\n' +
      'so dist/ imports it at runtime, but consumers never install it:\n\n' +
      problems
        .map(
          ({ ws, found }) =>
            `  ${ws.name} (${ws.location}/package.json)\n` +
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
