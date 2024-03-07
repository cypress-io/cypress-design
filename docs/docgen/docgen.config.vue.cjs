/// @ts-check
const { defineConfig } = require('vue-docgen-cli')

const path = require('path')

const { createChecker } = require('vue-component-meta')

const tsconfigPath = path.resolve(__dirname, '..', '..', 'tsconfig.vue.json')
const checker = createChecker(tsconfigPath)

module.exports = defineConfig({
  components: './*/vue/[A-Z]*.{vue,ts}',
  getDestFile: (componentPath, { outDir }) => {
    const name = componentPath.split('/').pop() || 'unknown'
    return path.join(outDir, 'vue', name.replace(/\.(vue|ts)$/, '.md'))
  },
  propsParser: async function (componentPath, _, event) {
    if (event === 'add') {
      checker.reload()
    }
    const exportNames = checker.getExportNames(componentPath)

    return exportNames.map((exportName) => {
      const meta = checker.getComponentMeta(componentPath, exportName)

      const nonGlobalProps = meta.props.filter((prop) => {
        return (
          !prop.global &&
          !prop.declarations.some((d) => d.file.includes('/node_modules/')) &&
          !prop.name.includes('-')
        )
      })

      // massage the output of meta to match the docgen format
      /**
       * @type {import('vue-docgen-api').PropDescriptor[] | undefined}
       */
      const props = nonGlobalProps.length
        ? nonGlobalProps.map((p) => {
            return {
              ...p,
              type: renderType(p),
              tags: p.tags.reduce((acc, t) => {
                acc[t.name] = [{ title: t.name, content: t.text }]
                return acc
              }, {}),
            }
          })
        : undefined

      /**
       * @type {import('vue-docgen-api').EventDescriptor[] | undefined}
       */
      const events = meta.events.length
        ? meta.events.map((e) => {
            const typeArray =
              e.type === 'any[]' ? [] : e.type.slice(1, -1).split(',')
            return {
              name: e.name,
              properties: e.schema.map((s, i) => {
                const name = typeArray[i]?.split(':')[0].trim()

                return {
                  ...renderEventProperty(s),
                }
              }),
            }
          })
        : undefined

      /**
       * @type {import('vue-docgen-api').SlotDescriptor[] | undefined}
       */
      const slots = meta.slots.length
        ? meta.slots.map(({ name, schema }) => {
            return {
              name,
              bindings: extractBindings(schema),
            }
          })
        : undefined

      return {
        props,
        slots,
        events,
        displayName:
          componentPath
            .split('/')
            .pop()
            ?.replace(/\.(ts|js|vue)/, '') || 'unknown',
        exportName,
        tags: {},
      }
    })
  },
  apiOptions: {
    modules: ['./node_modules'],
  },
})

/**
 * Renders a string representation of the type of a prop
 * @param {import('vue-component-meta').PropertyMeta} p
 * @returns {{ name: string, schema?: any }}
 */
function renderType(p) {
  const nonUndefinedType = p.type.replace(' | undefined', '')

  // avoid passing the schema for primitive types
  if (['boolean', 'number', 'string'].includes(nonUndefinedType)) {
    return { name: nonUndefinedType }
  }

  return { name: nonUndefinedType, schema: p.schema }
}

/**
 * Transforms a slot schema into a docgen bindings array
 * @param {import('vue-component-meta').SlotMeta['schema']} schema
 * @returns {import('vue-docgen-api').SlotDescriptor['bindings']}
 */
function extractBindings(schema) {
  if (typeof schema === 'string') {
    return undefined
  }

  if (schema.kind === 'object' && schema.schema) {
    return Object.keys(schema.schema).map((title) => {
      if (schema.schema) {
        return {
          title: title,
          type: renderType(schema.schema[title]),
        }
      }
      return { type: { name: title }, title }
    })
  }

  return undefined
}

/**
 * Renders a string representation of the type of a prop
 * @param {import('vue-component-meta').EventMeta['schema'][number]} p
 * @returns {NonNullable<import('vue-docgen-api').EventDescriptor['properties']>[number] & { schema?: any }}
 */
function renderEventProperty(p) {
  if (typeof p === 'string') {
    return { type: { names: [p] }, name: p }
  }

  const serializedType = p.type

  // avoid passing the schema for primitive types
  if (['boolean', 'number', 'string'].includes(serializedType)) {
    return { type: { names: [serializedType] }, name: serializedType }
  }

  return {
    type: { names: [serializedType] },
    name: serializedType,
    schema: {
      kind: 'object',
      type: serializedType,
      schema: p.schema,
    },
  }
}
