/// @ts-check
const { defineConfig } = require('vue-docgen-cli')
const { withCustomConfig } = require('react-docgen-typescript')
const path = require('path')

const tsconfigPath = path.resolve(
  __dirname,
  '..',
  '..',
  './tsconfig.react.json'
)
const parser = withCustomConfig(tsconfigPath, {
  shouldRemoveUndefinedFromOptional: true,
  shouldIncludePropTagMap: true,

  propFilter: (prop) => {
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const isNodeModules = prop.declarations.some((declaration) => {
        return declaration.fileName.includes('node_modules')
      })

      return !isNodeModules
    }

    return true
  },
})

module.exports = defineConfig({
  components: './*/react/[A-Z][A-Za-z0-9-]+\\.@(tsx|ts)',
  getDestFile: (componentPath, { outDir }) => {
    const name = componentPath.split('/').pop() || 'unknown'
    return path.join(outDir, 'react', name.replace(/\.(tsx|ts)$/, '.md'))
  },
  propsParser(componentPath) {
    const props = parser.parse(componentPath)
    const propsAdapted = props.map((p) => {
      /** @type import('vue-docgen-api').ComponentDoc */
      const mp = {
        displayName: p.displayName,
        props: Object.entries(p.props).reduce((acc, [pkey, pp]) => {
          /** @type NonNullable<import('vue-docgen-api').ComponentDoc['props']>[number] */
          const propType = {
            name: pkey,
            description: pp.description,
            type: pp.type,
            required: pp.required,
            defaultValue: pp.defaultValue,
          }
          acc.push(propType)
          return acc
        }, []),
        exportName: p.displayName,
        tags: Object.entries(p.tags || {}).reduce((acc, [k, v]) => {
          acc[k] = [{ title: k, content: v }]
          return acc
        }, {}),
      }
      return mp
    })
    return Promise.resolve(propsAdapted)
  },
})
