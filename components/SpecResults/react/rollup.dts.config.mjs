import resolve from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'

// Bundles the per-file `.d.ts` emitted by tsc (into dist/dts) into a single
// self-contained `dist/index.d.ts`. The private, bundled
// `@cypress-design/constants-spec-results` is intentionally NOT external, so
// its public types (SpecResultCounts, StripStatus) are inlined here --
// consumers never install that package. The real runtime deps below stay
// external (emitted as `import ... from '<pkg>'`) since consumers do install
// them.
export default {
  input: './dist/dts/index.d.ts',
  output: { file: './dist/index.d.ts', format: 'es' },
  plugins: [
    resolve({
      extensions: ['.d.ts', '.ts'],
      exportConditions: ['types', 'import', 'default'],
    }),
    dts({ respectExternal: true }),
  ],
  external: [
    'clsx',
    'react',
    'react-dom',
    '@cypress-design/react-button',
    '@cypress-design/react-statusicon',
    '@cypress-design/icon-registry',
  ],
}
