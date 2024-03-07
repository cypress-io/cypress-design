/// @ts-check
const { defineConfig } = require('vue-docgen-cli')
const { parseMulti } = require('vue-docgen-api')
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
    const docs = await parseMulti(componentPath).catch(() => [])
    return exportNames.map((exportName) => {
      const meta = checker.getComponentMeta(componentPath, exportName)

      const docgen = docs.find((d) => d.exportName === exportName)

      const nonGlobalProps = meta.props.filter((prop) => {
        return (
          !prop.global &&
          !prop.declarations.some((d) => d.file.includes('/node_modules/')) &&
          !prop.name.includes('-')
        )
      })

      // massage the output of meta to match the docgen format
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

      const events = meta.events.length
        ? meta.events.map((e) => {
            const event = docgen?.events?.find((d) => d.name === e.name) ?? {
              name: e.name,
              properties: [],
            }

            const typeArray =
              e.type === 'any[]' ? [] : e.type.slice(1, -1).split(',')
            return {
              ...event,

              properties: e.schema.map((s, i) => {
                const name = typeArray[i]?.split(':')[0].trim()
                const propDef = event.properties?.find(
                  (p) => p.name === name,
                ) ?? { names: [name] }
                const prop = {
                  ...propDef,
                  ...renderEventProperty(s),
                }
                return prop
              }),
            }
          })
        : undefined

      const slots = meta.slots.length
        ? meta.slots.map(({ name, schema }) => {
            const slot = docgen?.slots?.find((d) => d.name === name) ?? { name }
            return {
              ...slot,
              bindings: extractBindings(schema, slot?.bindings),
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
 *
 * @param {import('vue-component-meta').SlotMeta['schema']} schema
 * @param {import('vue-docgen-api').SlotDescriptor['bindings']} bindings
 * @returns {import('vue-docgen-api').SlotDescriptor['bindings']}
 */
function extractBindings(schema, bindings) {
  if (typeof schema === 'string') {
    return undefined
  }

  if (schema.kind === 'object' && schema.schema) {
    return Object.keys(schema.schema).map((title) => {
      const binding = bindings?.find((b) => b.title === title) ?? { title }
      if (schema.schema) {
        return {
          ...binding,
          type: renderType(schema.schema[title]),
        }
      }
      return binding
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
