import type { LibraryOptions, PluginOption } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin as TailwindKeepRollupPlugin } from '@cypress-design/rollup-plugin-tailwind-keep'

// UMD global names for externalized deps. Each MUST match that package's own
// `build.lib.name` (vite) / rollup `output.name` — they are not derivable from
// the package name (e.g. `@cypress-design/vue-statusicon` -> `StatusIcon`). Only
// the browser-global UMD build reads these; bundler/Node consumers resolve via
// the package specifier. Add an entry here when externalizing a new dep.
const UMD_GLOBALS: Record<string, string> = {
  vue: 'Vue',
  'tailwind-merge': 'tailwindMerge',
  '@cypress-design/icon-registry': 'CypressIconRegistry',
  '@cypress-design/details-animation': 'CyDetailsAnimation',
  '@cypress-design/vue-button': 'Button',
  '@cypress-design/vue-checkbox': 'Checkbox',
  '@cypress-design/vue-icon': 'Icon',
  '@cypress-design/vue-statusicon': 'StatusIcon',
  '@cypress-design/vue-tabs': 'Tabs',
  '@cypress-design/vue-tag': 'Tag',
  '@cypress-design/vue-textbox': 'Textbox',
  '@cypress-design/vue-tooltip': 'Tooltip',
}

// Externals shared by every vue component build.
const baseExternal = [
  'vue',
  '@cypress-design/icon-registry',
  '@cypress-design/vue-icon',
  '@cypress-design/details-animation',
]

// `extraExternal` lets a component externalize additional workspace deps it
// imports (e.g. sibling vue-* packages) so they are not bundled into its dist.
// `extraPlugins` lets a component add build plugins (e.g. vite-plugin-dts for
// self-contained, inlined `.d.ts` output).
export default (
  libConfig: LibraryOptions,
  extraExternal: string[] = [],
  extraPlugins: PluginOption[] = [],
) => {
  const external = [...baseExternal, ...extraExternal]
  const globals = Object.fromEntries(
    external.map((name) => {
      const global = UMD_GLOBALS[name]
      if (!global) {
        throw new Error(
          `vue.vite.config: no UMD global mapped for externalized "${name}". ` +
            `Add it to UMD_GLOBALS using the package's build.lib.name.`,
        )
      }
      return [name, global]
    }),
  )

  return defineConfig({
    build: {
      sourcemap: true,
      lib: {
        fileName: (format) =>
          `index.${format === 'es' ? 'es.mjs' : `${format}.js`}`,
        ...libConfig,
      },
      rollupOptions: {
        external,
        output: {
          globals,
        },
      },
    },
    plugins: [TailwindKeepRollupPlugin(), vue(), ...extraPlugins],
  })
}
