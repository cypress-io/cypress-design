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
    (size) => `${camelCase(name)}X${size}`,
  )

  const iconBodies = iconSet.reduce((acc, icon) => {
    const sizeIndex = availableIds.indexOf(icon.name)
    if (sizeIndex > -1) {
      const indexOfDefs = icon.data.indexOf('<defs>')
      acc[iconMetadata.availableSizes[sizeIndex]] = {
        body: indexOfDefs >= 0 ? icon.data.slice(0, indexOfDefs) : icon.data,
        // avoid defs: undefined in final exported code
        ...(indexOfDefs >= 0 ? { defs: icon.data.slice(indexOfDefs) } : {}),
      }
    }
    return acc
  }, {})

  return dedent`
  export const Icon${pascalCaseName}: React.FC<
    Omit<iconsRegistry.Icon${pascalCaseName}Props, 'name'> & React.SVGProps<SVGSVGElement>
  > = (props) => React.createElement('svg', useIconProps(props, ${JSON.stringify(
    iconBodies,
    null,
    2,
  )}, ${JSON.stringify(iconMetadata.availableSizes)}, ${JSON.stringify(name)}))
  `
})

writeFile(`
import * as React from 'react';
import * as iconsRegistry from '@cypress-design/icon-registry'
import { compileReactIconProperties } from './compileProperties'

function useIconProps(props: Omit<iconsRegistry.OpenIconProps, 'name'> & React.SVGProps<SVGSVGElement>, 
  iconBodiesAndDefs: Record<string, {body: string, defs?: string}>, 
  availableSizes: string[], 
  name: string) {
  const { interactiveColorsOnGroup, ...cleanProps } = props

  const { sizeWithDefault: size, compiledClasses } = iconsRegistry.getComponentAttributes({  
    ...cleanProps,
    availableSizes, 
    interactiveColorsOnGroup,
  })
  
  const { body, defs } = iconBodiesAndDefs[size] || {}
  if(!body){
    throw Error(\`Icon "${'$'}{name}" is not available in size ${'$'}{size}\`)
  }
  
  return compileReactIconProperties({
    ...cleanProps,
    name,
    size,
    body,
    defs,
    compiledClasses
  })
}


${iconsComponents.join('\n\n\n')}
`)

async function writeFile(fileContents) {
  await fs.writeFile(
    path.resolve(__dirname, './_TreeShakableIcons.ts'),
    fileContents,
    'utf-8',
  )
}
