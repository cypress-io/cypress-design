import * as path from 'path'
import generateViteConfig from '../../root.vite.config'

export default generateViteConfig({
  entry: path.resolve(__dirname, './index.ts'),
  name: 'Tabs',
})
