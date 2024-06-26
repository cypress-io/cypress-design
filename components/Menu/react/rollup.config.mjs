import rootRollupConfig from '../../react.rollup.config.mjs'
import pkg from './package.json' assert { type: 'json' }

export default rootRollupConfig({
  input: './index.ts',
  external: Object.keys(pkg.dependencies),
})
