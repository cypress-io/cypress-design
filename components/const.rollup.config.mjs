// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default ({ input = './src/index.ts', plugins = [], external = [] }) => [
  {
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
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declarationMap: true,
      }),
      ...plugins,
    ],
    external,
  },
]
