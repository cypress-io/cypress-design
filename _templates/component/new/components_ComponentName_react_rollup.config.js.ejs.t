---
to: components/<%= h.inflection.camelize(name, false) %>/react/rollup.config.js
---
import rootRollupConfig from '../../root.rollup.config'

export default rootRollupConfig({ input: './index.ts' })
