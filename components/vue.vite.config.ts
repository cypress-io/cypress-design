import type { LibraryOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin as TailwindKeepRollupPlugin } from '@cypress-design/rollup-plugin-tailwind-keep'

// Derive a UMD global name for an externalized @cypress-design package, e.g.
// '@cypress-design/constants-runresults' -> 'CyConstantsRunresults'.
const umdGlobal = (name: string) =>
  'Cy' +
  name
    .replace('@cypress-design/', '')
    .replace(/(^|-)(\w)/g, (_m, _d, c) => c.toUpperCase())

// Base externals shared by every vue component build.
const baseGlobals: Record<string, string> = {
  vue: 'Vue',
  '@cypress-design/icon-registry': 'CyIconRegistry',
  '@cypress-design/vue-icon': 'CyIcon',
  '@cypress-design/details-animation': 'CyDetailsAnimation',
}

// `extraExternal` lets a component externalize additional workspace deps it
// imports (e.g. its constants-* and sibling vue-* packages) so they are NOT
// bundled into its dist — fixing "failed to resolve import" at build time and
// ensuring those deps (notably constants-*) are picked up at runtime rather
// than frozen as an inlined copy.
export default (libConfig: LibraryOptions, extraExternal: string[] = []) => {
  const globals: Record<string, string> = {
    ...baseGlobals,
    ...Object.fromEntries(extraExternal.map((name) => [name, umdGlobal(name)])),
  }

  return defineConfig({
    build: {
      sourcemap: true,
      lib: {
        fileName: (format) =>
          `index.${format === 'es' ? 'es.mjs' : `${format}.js`}`,
        ...libConfig,
      },
      rollupOptions: {
        external: Object.keys(globals),
        output: {
          globals,
        },
      },
    },
    plugins: [TailwindKeepRollupPlugin(), vue()],
  })
}
