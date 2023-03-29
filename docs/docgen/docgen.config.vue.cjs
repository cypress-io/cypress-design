/// @ts-check
const { defineConfig } = require('vue-docgen-cli')
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
 * @returns {string}
 */
function renderType(p) {
  if (typeof p.schema !== 'string') {
    // if it's an enum, render it as a union type
    if (
      p.schema.kind === 'enum' &&
      typeof p.schema.schema !== 'string' &&
      p.schema.schema.length
    ) {
      // remove undefined from enum values
      return p.schema.schema
        .filter((v) => v !== 'undefined')
        .map((v) => v)
        .join(' | ')
    }
  }
  return p.type
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
        type: { name: renderType(schema.schema[k]) },
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
  propsParser(componentPath, _, event) {
    if (event === 'add') {
      checker.reload()
    }
    const exportNames = checker.getExportNames(componentPath)
    return Promise.resolve(
      exportNames.map((exportName) => {
        const meta = checker.getComponentMeta(componentPath, exportName)

        const nonGlobalProps = meta.props.filter((prop) => !prop.global)

        // massage the output of meta to match the docgen format
        const props = nonGlobalProps.length
          ? nonGlobalProps.map((p) => {
              return {
                ...p,
                type: {
                  name: renderType(p),
                },
                tags: p.tags.reduce((acc, t) => {
                  acc[t.name] = [{ title: t.name, content: t.text }]
                  return acc
                }, {}),
              }
            })
          : undefined

        const slots = meta.slots.length
          ? meta.slots.map((s) => {
              return defineSlot({
                name: s.name,
                description: s.description,
                bindings: extractBindings(s.schema),
              })
            })
          : undefined

        const events = meta.events.length
          ? meta.events.map((s) => ({
              name: s.name,
            }))
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
    )
  },
})
