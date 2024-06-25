import postcss from 'rollup-plugin-postcss'
import rootRollupConfig from '../../root.rollup.config.mjs'
import pkg from './package.json' assert { type: 'json' }

export default rootRollupConfig({
  input: './index.ts',
  plugins: [
    postcss({
      extract: false,
      module: true,
      use: ['sass'],
    }),
  ],
  external: Object.keys(pkg.dependencies),
})
