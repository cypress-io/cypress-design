// @ts-check
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { camelCase } from 'lodash-es'
import prettier from 'prettier'
import { optimize, loadConfig } from 'svgo'
import xml2js from 'xml2js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildLogoIcons() {
  const config = await loadConfig()
  const cwd = path.join(__dirname, 'icons-logo')
  const files = await globby('*.svg', {
    cwd,
  })

  /**
   * @type {Record<string, {d: Record<string, string>, dAnimated: Record<string, string>}> | {d: Record<string, string>, dAnimated: Record<string, string>}}
   */
  const icons = {}

  for (const filePath of files) {
    const fileContent = await fs.readFile(path.join(cwd, filePath), 'utf8')

    const [fileWithoutExtension] = filePath.split('.')
    const [iconNameKebab, variant = 'default'] = fileWithoutExtension.split('_')

    const iconName = camelCase(`logo-${iconNameKebab}`)

    icons[iconName] = icons[iconName] ?? {}

    const result = await xml2js.parseStringPromise(fileContent)

    icons[iconName][variant] = icons[iconName][variant] ?? {}

    // viewBox
    const viewBox = result.svg.$.viewBox
    icons[iconName][variant].viewBox = viewBox

    // default dimensions
    const viewBoxParts = viewBox.split(' ')
    const height = parseInt(viewBoxParts[3]) - parseInt(viewBoxParts[1])
    const width = parseInt(viewBoxParts[2]) - parseInt(viewBoxParts[0])
    icons[iconName][variant].width = width
    icons[iconName][variant].height = height

    // content
    icons[iconName][variant].data = optimize(fileContent, {
      path: path.join(cwd, filePath),
      ...config,
    }).data
  }

  return Object.entries(icons)
    .map(([key, value]) => {
      return `export const ${key} = ${JSON.stringify(value, null, 2)} as const`
    })
    .join(`\n\n`)
}

export default async function main() {
  const code = await buildLogoIcons()
  const filepath = path.join(__dirname, 'src/logos.ts')
  const formattedCode = await prettier.format(code, {
    singleQuote: true,
    semi: false,
    filepath,
  })
  return formattedCode
}
