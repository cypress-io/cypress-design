import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import WindiKeepRollupPlugin from '@cypress-design/css/dist/windi-keep-rollup-plugin'

export default ({ input, plugins = [] }) => ({
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
    WindiKeepRollupPlugin(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
      declarationMap: false,
      sourceMap: true,
    }),
    ...plugins,
  ],
  external: [
    'clsx',
    'react',
    '@cypress-design/icon-registry',
    '@cypress-design/details-animation',
  ],
})
