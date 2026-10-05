import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { rollup } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import { build } from 'esbuild'

/**
 * Bundles a consumer that imports a single icon from the built packages and
 * checks that unused icons (and the rest of the icon registry) are dropped.
 *
 * Packages are imported by name so their `sideEffects` flag is honored, the
 * same way a consuming app resolves them. This runs against `dist/`, so the
 * packages must be built first (`yarn build:components`).
 */

const ROOT = resolve(__dirname, '../..')
const EXTERNALS = ['vue', 'react', 'react-dom', 'clsx']

const USED_ICON = 'action-play-small'
// Any icon the entry does not import. Its name appears both in the generated
// component and in the registry metadata, so finding it means a leak.
const UNUSED_ICON = 'action-add-circle-large'
// A single icon is ~13 KB. A full bundle is ~500 KB, so this leaves headroom
// for normal growth while still catching a regression.
const MAX_BYTES = 50_000

const isExternal = (id: string) =>
  EXTERNALS.some((name) => id === name || id.startsWith(`${name}/`))

async function bundleWithRollup(code: string) {
  const bundle = await rollup({
    input: 'entry',
    external: isExternal,
    onwarn: () => {},
    plugins: [
      {
        name: 'virtual-entry',
        resolveId: (id) => (id === 'entry' ? id : null),
        load: (id) => (id === 'entry' ? code : null),
      },
      nodeResolve({ rootDir: ROOT }),
    ],
  })
  const { output } = await bundle.generate({ format: 'esm' })
  await bundle.close()
  return output[0].code
}

async function bundleWithEsbuild(code: string) {
  const result = await build({
    stdin: { contents: code, resolveDir: ROOT, loader: 'js' },
    bundle: true,
    format: 'esm',
    write: false,
    external: EXTERNALS,
    logLevel: 'silent',
  })
  return result.outputFiles[0].text
}

const bundlers = {
  rollup: bundleWithRollup,
  esbuild: bundleWithEsbuild,
}

describe.each(['vue', 'react'])(
  '@cypress-design/%s-icon tree shaking',
  (framework) => {
    const pkg = `@cypress-design/${framework}-icon`

    beforeAll(() => {
      const dist = resolve(__dirname, framework, 'dist/index.es.mjs')
      if (!existsSync(dist)) {
        throw new Error(
          `${pkg} is not built (${dist} is missing). Run \`yarn build:components\` first.`,
        )
      }
    })

    describe.each(Object.entries(bundlers))('with %s', (_, bundle) => {
      it('only includes the imported icon', async () => {
        const output = await bundle(
          `import { IconActionPlaySmall } from '${pkg}'\nconsole.log(IconActionPlaySmall)`,
        )

        expect(output).toContain(USED_ICON)
        expect(output).not.toContain(UNUSED_ICON)
        expect(output.length).toBeLessThan(MAX_BYTES)
      })

      it('drops everything when nothing is used', async () => {
        const output = await bundle(`import '${pkg}'`)

        expect(output).not.toContain(USED_ICON)
        expect(output).not.toContain(UNUSED_ICON)
      })
    })
  },
)
