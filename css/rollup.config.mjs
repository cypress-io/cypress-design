import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
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
  config({ input: './src/colors.ts', outputFile: './dist/colors' }),
]
