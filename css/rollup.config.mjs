import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json' assert { type: 'json' }

const external = Object.keys(pkg.dependencies)

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
      postcss({
        minimize: true,
        modules: false,
        extensions: ['.css'],
        inject: false,
        writeDefinitions: true,
        extract: 'index.css',
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
  ...exports
    .filter((ex) => !ex.endsWith('.css'))
    .map((ex) => {
      return config({ input: `./src/${ex}.ts`, outputFile: `./dist/${ex}` })
    }),
]
