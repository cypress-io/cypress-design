/// @ts-check
const { defineConfig } = require('vue-docgen-cli')
const { parseMulti } = require('vue-docgen-api')
const path = require('path')

const { createComponentMetaChecker } = require('vue-component-meta')

const tsconfigPath = path.resolve(__dirname, '..', '..', './tsconfig.vue.json')
const checker = createComponentMetaChecker(tsconfigPath)

/**
 * @param {import('vue-docgen-api').SlotDescriptor} slot
 * @returns {import('vue-docgen-api').SlotDescriptor}
 */
function defineSlot(slot) {
  return slot
}

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
 * @returns {import('vue-docgen-api').SlotDescriptor['bindings']}
 */
function extractBindings(schema) {
  if (typeof schema === 'string') {
    return undefined
  }
  if (schema.kind === 'object') {
    return Object.keys(schema.schema).map((k) => {
      return {
        title: k,
        type: renderType(schema.schema[k]),
      }
    })
  }
  return undefined
}

module.exports = defineConfig({
  components: './*/vue/[A-Z]*.@(vue|ts)',
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

      const nonGlobalProps = meta.props.filter((prop) => !prop.global)

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

      const slots = meta.slots.length
        ? meta.slots.map((s) => {
            const slot = docgen.slots.find((d) => d.name === s.name)
            return (
              slot ??
              defineSlot({
                name: s.name,
                description: s.description,
                bindings: extractBindings(s.schema),
              })
            )
          })
        : undefined

      const events = meta.events.length
        ? meta.events.map((e) => {
            const event = docgen.events.find((d) => d.name === e.name)
            return (
              event ?? {
                description: event.description,
                type: {
                  names: e.type
                    .replace(/^\[/, '')
                    .replace(/\]$/, '')
                    .split(','),
                },
                name: e.name,
              }
            )
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
})
