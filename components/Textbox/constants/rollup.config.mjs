import rootRollupConfig from '../../const.rollup.config.mjs'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default rootRollupConfig({
  external: Object.keys(pkg.dependencies ?? {}),
})

