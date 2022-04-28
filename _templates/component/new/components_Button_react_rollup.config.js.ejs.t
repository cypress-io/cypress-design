---
to: components/<%= h.capitalize(name) %>/react/rollup.config.js
---
import rootRollupConfig from '../../root.rollup.config';

export default rootRollupConfig({ input: './index.ts' });
