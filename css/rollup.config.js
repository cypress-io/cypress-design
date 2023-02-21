import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.cjs.js',
      inlineDynamicImports: true,
      format: 'commonjs',
      exports: 'auto',
      sourcemap: true,
    },
    {
      file: './dist/index.es.mjs',
      format: 'esm',
      inlineDynamicImports: true,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      sourceMap: true,
      declaration: false,
      declarationMap: false,
      outDir: './dist',
    }),
  ],
}
