import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { WindKeepRollupPlugin } from '@cypress-design/css'

export default ({ input, plugins = [] }) => ({
  input,
  output: [
    {
      file: './dist/index.umd.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
    },
    {
      file: './dist/index.es.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    WindKeepRollupPlugin(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
      declarationMap: false,
      sourceMap: true,
    }),
    ...plugins,
  ],
  external: [
    'clsx',
    'react',
    '@cypress-design/icon-registry',
    '@cypress-design/details-animation',
  ],
})
