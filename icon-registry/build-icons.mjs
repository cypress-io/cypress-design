// @ts-check

/**
 * Generate icons.js and icons.d.ts
 * Also creates barrel files index.js and index.d.ts
 * Needs to be run last since it will override the dummy `icons` files generated by tsc
 */
import buildAnimatedIcons from './build-animated-icons.mjs'
import { promises as fs } from 'fs'
import getIcons from './generate-icons-content.mjs'

Promise.all([getIcons(), buildAnimatedIcons()]).then(async ([content]) => {
  await fs.writeFile('./src/icons.ts', content)
  // eslint-disable-next-line no-console
  console.log('Icons generated')
  process.exit(0)
})
