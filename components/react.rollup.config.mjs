import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import rollupPluginPackage from '@cypress-design/rollup-plugin-tailwind-keep'
const { Plugin: TailwindKeepRollupPlugin } = rollupPluginPackage

export default ({ input, plugins = [], external = [] }) => ({
  input,
  output: [
    {
      file: './dist/index.umd.js',
      format: 'cjs',
      exports: 'auto',
      // Rollup 3+ defaults `output.interop` to 'default', which emits bare
      // `require('@cypress-design/react-*')` for default-imported sibling
      // packages. Those siblings are `__esModule` with the component on
      // `.default`, so a bare require returns the module namespace object and
      // React tries to render a module -> crash. 'auto' emits a runtime
      // `_interopDefault` (`__esModule` check) so defaults resolve via
      // `.default`, removing the need for consumer-side ESM aliases.
      interop: 'auto',
      sourcemap: true,
    },
    {
      file: './dist/index.es.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
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
    ...external,
    'clsx',
    'react',
    'react-dom',
    '@cypress-design/icon-registry',
    '@cypress-design/details-animation',
  ],
})
