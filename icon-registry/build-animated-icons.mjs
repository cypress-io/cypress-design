// @ts-check
import { promises as fs } from 'fs'
import { globby } from 'globby'
import xml2js from 'xml2js'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { camelCase } from 'lodash-es'
import prettier from 'prettier'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildAnimatedIcons() {
  const files = await globby('*.svg', {
    cwd: path.join(__dirname, 'icons-animated'),
  })

  /**
   * @type {Record<string, {d: Record<string, string>, dAnimated: Record<string, string>}> | {d: Record<string, string>, dAnimated: Record<string, string>}}
   */
  const icons = {}

  for (const filePath of files) {
    const fileContent = await fs.readFile(
      path.join(__dirname, `icons-animated/${filePath}`),
    )

    const [fileWithoutExtension] = filePath.split('.')
    const [iconNameKebab, animationType] = fileWithoutExtension.split('_')

    const iconName = camelCase(`icon-animated-${iconNameKebab}`)

    icons[iconName] = icons[iconName] ?? {}

    // With parser
    const result = await xml2js.parseStringPromise(fileContent)
    const animatedKey = animationType === 'animated' ? 'dAnimated' : 'd'

    for (const svgPath of result.svg.path) {
      const localId = svgPath.$.id
      if (localId) {
        icons[iconName][localId] = icons[iconName][localId] ?? {}
        icons[iconName][localId][animatedKey] = svgPath.$.d
      } else {
        icons[iconName][animatedKey] = svgPath.$.d
      }
    }
  }

  return `
  interface AnimatablePath {
    d: string
    dAnimated: string
  }

  ${Object.entries(icons)
    .map(([key, value]) => {
      return `export const ${key}: ${Object.keys(value).includes('d') ? 'AnimatablePath' : `Record<'${Object.keys(value).join("' | '")}', AnimatablePath>`} = ${JSON.stringify(value, null, 2)}`
    })
    .join(`\n\n`)}`
}

export default async function main() {
  const code = await buildAnimatedIcons()
  const filepath = path.join(__dirname, 'src/animated-icons.ts')
  const formattedCode = await prettier.format(code, {
    singleQuote: true,
    semi: false,
    filepath,
  })
  await fs.writeFile(filepath, formattedCode)
  // eslint-disable-next-line no-console
  console.log('Build animated icons done!')
}
