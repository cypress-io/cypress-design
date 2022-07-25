const path = require('path')
const dedent = require('dedent')
const { promises: fs } = require('fs')
const { iconsMetadata, iconSet } = require('@cypress-design/icon-registry')
const { camelCase, startCase } = require('lodash')

const pascalCase = (str) => startCase(camelCase(str)).replace(/ /g, '')

const iconsComponents = Object.keys(iconsMetadata).map((name) => {
  const pascalCaseName = pascalCase(name)
  const iconMetadata = iconsMetadata[name]
  const availableIds = iconMetadata.availableSizes.map(
    (size) => `${camelCase(name)}X${size}`
  )

  const iconBodies = iconSet.reduce((acc, icon) => {
    const sizeIndex = availableIds.indexOf(icon.name)
    if (sizeIndex > -1) {
      acc[iconMetadata.availableSizes[sizeIndex]] = icon.data
    }
    return acc
  }, {})
  return dedent`
  export const Icon${pascalCaseName} = (props: SVGAttributes & Omit<iconsRegistry.Icon${pascalCaseName}Props, 'name'>) => {
    const { sizeWithDefault: size, compiledClasses } = iconsRegistry.getComponentAttributes({ ...(props as any), availableSizes: ${JSON.stringify(
      iconMetadata.availableSizes
    )} })
    const iconBodies: Record<string, string> = ${JSON.stringify(
      iconBodies,
      null,
      2
    )}
    const body = iconBodies[size]
    if(!body){
      throw Error(\`Icon "${name}" is not available in size ${'$'}{size}\`)
    }
    return h('svg', compileVueIconProperties({
      ...props,
      size,
      body,
      compiledClasses
    }))
  }
  `
})

writeFile(`
import * as iconsRegistry from '@cypress-design/icon-registry'
import { compileVueIconProperties } from './compileProperties'
import type { SVGAttributes } from 'vue'
import { h } from 'vue'

${iconsComponents.join('\n\n\n')}
`)

async function writeFile(fileContents) {
  await fs.writeFile(
    path.resolve(__dirname, './TreeShakableIcons.ts'),
    fileContents,
    'utf-8'
  )
}
