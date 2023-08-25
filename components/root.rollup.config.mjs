import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import rollupPluginPackage from '@cypress-design/rollup-plugin-tailwind-keep'
import svgr from '@svgr/rollup'
const { Plugin: TailwindKeepRollupPlugin } = rollupPluginPackage

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
    svgr(),
    TailwindKeepRollupPlugin(),
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
