import resolve from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'

// Bundles the per-file `.d.ts` emitted by tsc (into dist/dts) into one
// self-contained `dist/index.d.ts`. The private, bundled
// `@cypress-design/constants-table` is left out of `external`, so its public
// types are inlined; consumers never install that package.
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
    '@cypress-design/react-icon',
    'clsx',
    'react',
    'react-dom',
    'tailwind-merge',
  ],
}
