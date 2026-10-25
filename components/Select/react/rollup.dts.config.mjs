import resolve from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'

// Bundles the per-file `.d.ts` emitted by tsc (into dist/dts) into a single
// self-contained `dist/index.d.ts`. The private, bundled
// `@cypress-design/constants-select` is intentionally NOT external, so its
// public types (SelectItem, SelectProps, SelectOptionListProps, etc.) are
// inlined here — consumers never install that package. The real runtime deps
// below stay external (emitted as `import ... from '<pkg>'`) since consumers
// do install them.
export default {
  input: './dist/dts/index.d.ts',
  output: { file: './dist/index.d.ts', format: 'es' },
  plugins: [
    resolve({
      extensions: ['.d.ts', '.ts'],
      // Resolve bare specifiers (the private constants pkg) to their `.d.ts`
      // via the `types` export condition so rollup-plugin-dts can inline them.
      exportConditions: ['types', 'import', 'default'],
    }),
    dts({ respectExternal: true }),
  ],
  // Only list packages that are actually `dependencies` here. Listing a
  // package as `external` that isn't in `dependencies` means strict
  // package managers (pnpm) will fail type resolution if any type from
  // that package survives into `dist/index.d.ts`. Grep the built dist
  // after any change here to confirm nothing references a non-dep.
  external: [
    'clsx',
    'react',
    'react-dom',
    '@cypress-design/react-button',
    '@cypress-design/react-checkbox',
    '@cypress-design/react-icon',
    '@cypress-design/react-tabs',
    '@cypress-design/react-tag',
    '@cypress-design/react-textbox',
  ],
}
