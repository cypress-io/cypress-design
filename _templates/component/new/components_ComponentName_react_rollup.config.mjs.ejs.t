---
to: components/<%= h.inflection.camelize(name, false) %>/react/rollup.config.mjs
---
import rootRollupConfig from '../../root.rollup.config.mjs'
import pkg from './package.json' assert { type: 'json' }

export default rootRollupConfig({
  input: './index.ts',
  external: Object.keys(pkg.dependencies),
})

