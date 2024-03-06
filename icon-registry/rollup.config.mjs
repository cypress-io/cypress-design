import commonjs from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }
import * as url from 'url'
import { resolve } from 'path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default {
  input: resolve(__dirname, './src/index.ts'),
  output: [
    {
      file: resolve(__dirname, './dist/index.umd.js'),
      format: 'umd',
      exports: 'auto',
      sourcemap: true,
      name: 'CypressIconRegistry',
    },
    {
      file: resolve(__dirname, './dist/index.es.mjs'),
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolvePlugin(),
    commonjs(),
    typescript({
      tsconfig: resolve(__dirname, './tsconfig.json'),
    }),
  ],
  external: Object.keys(pkg.dependencies),
}
