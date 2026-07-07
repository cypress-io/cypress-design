import rootRollupConfig from '../../react.rollup.config.mjs'
import pkg from './package.json' with { type: 'json' }

// Externalize every sibling published package listed in dependencies (all
// the react-* primitives + clsx). `@cypress-design/constants-select` is
// intentionally NOT in dependencies — it's a private workspace package that
// this dist inlines, so consumers install only `@cypress-design/react-select`.
export default rootRollupConfig({
  input: './index.ts',
  external: Object.keys(pkg.dependencies),
})
