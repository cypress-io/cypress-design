import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { dependencies } from './package.json'

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.cjs.js',
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
      tsconfig: './tsconfig.build.json',
      sourceMap: true,
      declaration: false,
      declarationMap: false,
      outDir: './dist',
    }),
  ],
  external: Object.keys(dependencies),
}
