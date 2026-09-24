import * as path from 'path'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig(
  {
    entry: path.resolve(__dirname, './index.ts'),
    name: 'Favicon',
  },
  // Externalized, not bundled. FAVICON_LINKS must be resolved from
  // @cypress-design/favicon at runtime so this component and react-favicon
  // always agree with the array the package actually ships -- a favicon-only
  // release would otherwise leave a stale copy baked in here.
  ['@cypress-design/favicon'],
)
