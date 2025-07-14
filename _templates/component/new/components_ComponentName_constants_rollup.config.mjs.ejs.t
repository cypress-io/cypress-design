---
to: components/<%= h.inflection.camelize(name, false) %>/constants/rollup.config.mjs
---
import rootRollupConfig from '../../const.rollup.config.mjs'
import pkg from './package.json' with { type: 'json' }

export default rootRollupConfig({
  external: Object.keys(pkg.dependencies ?? []),
})

