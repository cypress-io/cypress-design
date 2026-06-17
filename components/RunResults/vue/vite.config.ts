import * as path from 'path'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig(
  {
    entry: path.resolve(__dirname, './index.ts'),
    name: 'RunResults',
  },
  // Externalize the workspace deps this component imports so they aren't
  // bundled (fixes "failed to resolve @cypress-design/constants-runresults"),
  // and so constants-runresults is consumed at runtime — picking up the latest
  // styles instead of an inlined/frozen copy.
  [
    '@cypress-design/constants-runresults',
    '@cypress-design/vue-statusicon',
    '@cypress-design/vue-tooltip',
  ],
)
