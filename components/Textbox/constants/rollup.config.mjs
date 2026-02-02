import rootRollupConfig from '../../const.rollup.config.mjs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pkg = require('./package.json')

export default rootRollupConfig({
  external: Object.keys(pkg.dependencies ?? {}),
})
