import postcss from 'rollup-plugin-postcss'
import rootRollupConfig from '../../root.rollup.config.mjs'

export default rootRollupConfig({
  input: './index.ts',
  plugins: [
    postcss({
      extract: false,
      module: true,
      use: ['sass'],
    }),
  ],
})
