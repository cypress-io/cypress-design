import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import * as path from 'path'

const sourcemapPathTransform = (sourcePath) =>
  sourcePath.replace(
    // To demonstrate, sourcePath is a relative path and I am doing a string-replace on it.
    `..${path.sep}..${path.sep}`,
    // I'm replacing it with the package name followed by a slash.
    `..${path.sep}`,
  )

export default {
  input: './index.ts',
  output: [
    {
      file: './dist/index.umd.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
      sourcemapPathTransform,
    },
    {
      file: './dist/index.es.mjs',
      format: 'esm',
      sourcemap: true,
      sourcemapPathTransform,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      sourceMap: true,
    }),
  ],
}
