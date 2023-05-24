import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import JSON from '@rollup/plugin-json'
import pkg from './package.json' assert { type: 'json' }

const config = ({ input, outputFile, external }) => {
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
      JSON(),
    ],
    external,
  }
}

export default [
  config({
    input: './src/index.ts',
    outputFile: './dist/index',
    external: Object.keys(pkg.dependencies),
  }),
  ...['colors', 'icon-extractor-tools', 'theme.config'].map((name) =>
    config({
      input: `./src/${name}.ts`,
      outputFile: `./dist/${name}`,
    })
  ),
]
