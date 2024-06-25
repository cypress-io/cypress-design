// @ts-check

/**
 * Generate icons.js and icons.d.ts
 * Also creates barrel files index.js and index.d.ts
 * Needs to be run last since it will override the dummy `icons` files generated by tsc
 */
import { promises as fs } from 'fs'
import buildAnimatedIcons from './build-animated-icons.mjs'
import getIcons from './generate-icons-content.mjs'
import buildLogoIcons from './build-logo-icons.mjs'

Promise.all([
  getIcons().then((icons) => fs.writeFile('./src/icons.ts', icons)),
  buildAnimatedIcons().then((animatedIcons) =>
    fs.writeFile('./src/animated-icons.ts', animatedIcons),
  ),
  buildLogoIcons().then((logoIcons) =>
    fs.writeFile('./src/logos.ts', logoIcons),
  ),
]).then(() => console.log('Icons generated'))
