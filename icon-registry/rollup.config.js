import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.umd.js',
      format: 'umd',
      exports: 'auto',
      sourcemap: true,
      name: 'CypressIconRegistry',
      globals: {
        lodash: 'lodash',
      },
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
      sourceMap: true,
      declaration: false,
      declarationMap: false,
      outDir: './dist',
    }),
  ],
  external: ['lodash'],
}
