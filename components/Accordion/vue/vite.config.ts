import * as path from 'path'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig({
  entry: path.resolve(__dirname, './index.ts'),
  name: 'Accordion',
})
