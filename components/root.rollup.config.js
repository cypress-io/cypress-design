import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default ({ input, plugins = [] }) => ({
  input,
  output: [
    {
      file: './dist/index.umd.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
      sourcemapPathTransform: (sourcePath) =>
        sourcePath.includes('node_modules')
          ? sourcePath
          : sourcePath.replace(/^\.\.\/\.\.\/(\w)/, `../../react/$1`),
    },
    {
      file: './dist/index.es.js',
      format: 'esm',
      sourcemap: true,
      sourcemapPathTransform: (sourcePath) =>
        sourcePath.includes('node_modules')
          ? sourcePath
          : sourcePath.replace(/^\.\.\/\.\.\/(\w)/, `../../react/$1`),
    },
  ],
  plugins: [
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
  external: ['clsx', 'react', '@cypress-design/icon-registry'],
})
