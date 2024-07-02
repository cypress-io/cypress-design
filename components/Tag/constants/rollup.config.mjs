import rootRollupConfig from '../../const.rollup.config.mjs'
import pkg from './package.json' assert { type: 'json' }

export default rootRollupConfig({
  external: Object.keys(pkg.dependencies ?? {}),
})
