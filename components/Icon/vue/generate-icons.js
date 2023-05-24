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
  export const Icon${pascalCaseName} = defineComponent((props: Omit<iconsRegistry.Icon${pascalCaseName}Props, 'name'> & {
    class?: string
  }, { attrs }: { attrs: Omit<SVGAttributes, 'name' | 'class'> }) => {
    const iconPropsStep = useIconProps(props, ${JSON.stringify(
      iconBodies,
      null,
      2
    )}, ${JSON.stringify(iconMetadata.availableSizes)}, ${JSON.stringify(name)})

    const { componentProps, defs } = compileVueIconProperties(iconPropsStep)

    const shouldRenderDefs = computed(() => {
      if (defs.value)
        if (defsAlreadyLoaded.has(${JSON.stringify(name)}) === true) {
          if (typeof document !== 'undefined') {
            return !document.querySelector(
              '[data-cy-icon-unified-defs=${JSON.stringify(name)}]'
            )
          } else {
            return false
          }
        } else {
          defsAlreadyLoaded.add(${JSON.stringify(name)})
          return true
        }
      return false
    })

    return () => hyperSVG(componentProps, defs, shouldRenderDefs, attrs, props.class)
  },
  // @ts-expect-error - vue types need an update 
  __iconComponentOpts__)
  `
})

writeFile(`
import { h, defineComponent, computed } from 'vue'
import type { ComputedRef, SVGAttributes } from 'vue'
import * as iconsRegistry from '@cypress-design/icon-registry'
import { compileVueIconProperties } from './compileProperties'

const __iconComponentOpts__ = {
  props: [...iconsRegistry.ICON_COLOR_PROP_NAMES, 'interactiveColorsOnGroup', 'size', 'class'],
} as const

function useIconProps(props: SVGAttributes & Omit<iconsRegistry.IconProps, 'name'>, iconBodiesAndDefs: Record<string, {body: string, defs?: string}>, availableSizes: string[], name: string) {
  return computed(() => {
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
    
    return {
      ...cleanProps,
      name,
      size,
      body,
      defs,
      compiledClasses
    }
  })
}

function hyperSVG(
    componentProps: ComputedRef<SVGAttributes>, 
    defs: ComputedRef<string | undefined>, 
    shouldRenderDefs: ComputedRef<boolean>, 
    attrs: SVGAttributes,
    className?: string, 
  ) {

  return shouldRenderDefs.value && defs.value
    ? [
        h('svg', {
          innerHTML: defs.value,
          height: 0,
          width: 0,
          style: 'position:absolute',
          class: [
            'pointer-events-none',
            'opacity-0',
          ],
        }),
        h('svg', {
          ...attrs,
          ...componentProps.value,
          class: [className, componentProps.value.class],
        }),
      ]
    : h('svg', {
        ...attrs,
        ...componentProps.value,
        class: [className, componentProps.value.class],
      })
}

const defsAlreadyLoaded = new Set<string>()
${iconsComponents.join('\n\n\n')}
`)

async function writeFile(fileContents) {
  await fs.writeFile(
    path.resolve(__dirname, './_TreeShakableIcons.ts'),
    fileContents,
    'utf-8'
  )
}
