import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }

const external = [...Object.keys(pkg.dependencies), 'picocolors']

const exports = Object.keys(pkg.exports)
  .filter((r) => r !== '.' && !r.endsWith('.json'))
  .map((r) => r.replace(/^\.\/dist\//, ''))

const config = ({ input, outputFile }) => {
  return {
    input,
    output: [
      {
        file: `${outputFile}.cjs.js`,
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
      },
      {
        file: `${outputFile}.es.mjs`,
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
    external,
  }
}

export default [
  config({
    input: './src/index.ts',
    outputFile: './dist/index',
  }),
  ...exports.map((ex) => {
    return config({ input: `./src/${ex}.ts`, outputFile: `./dist/${ex}` })
  }),
]
