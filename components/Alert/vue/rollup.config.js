import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './index.ts',
  output: [
    {
      file: './dist/index.umd.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
      sourcemapPathTransform: (sourcePath) =>
        sourcePath.includes('node_modules')
          ? sourcePath
          : sourcePath.replace(/^\.\.\/\.\.\/(\w)/, `../../vue/$1`),
    },
    {
      file: './dist/index.es.js',
      format: 'esm',
      sourcemap: true,
      sourcemapPathTransform: (sourcePath) =>
        sourcePath.includes('node_modules')
          ? sourcePath
          : sourcePath.replace(/^\.\.\/\.\.\/(\w)/, `../../vue/$1`),
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    postcss(),
    typescript({
      tsconfig: './tsconfig.build.json',
      include: ['./*.ts', '../*.ts', './*.vue'],
      declaration: false,
      declarationMap: false,
      sourceMap: true,
    }),
  ],
  external: [
    'vue',
    '@cypress-design/icon-registry',
    '@cypress-design/vue-icon',
  ],
}
