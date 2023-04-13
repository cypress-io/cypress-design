---
to: components/<%= h.inflection.camelize(name, false) %>/react/rollup.config.mjs
---
import rootRollupConfig from '../../root.rollup.config.mjs'

export default rootRollupConfig({ input: './index.ts' })
