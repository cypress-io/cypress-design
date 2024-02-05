// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')
const renderType = require('./renderType.cjs')

const { mdclean } = defaultTemplates

/**
 * @param {Array<import('vue-docgen-api').SlotDescriptor>} slots
 * @param {{isSubComponent:boolean, hasSubComponents:boolean}} [opt]
 * @returns {Promise<string>}
 */
module.exports = async function renderProp(slots, opt) {
  if (!slots.length) return ''
  const supComponent = opt?.isSubComponent || opt?.hasSubComponents
  return `
${supComponent ? '#' : ''}## Slots

${await lineTemplate(slots, supComponent)}
`
}

/**
 *
 * @param {Array<import('vue-docgen-api').SlotDescriptor>} slot
 * @param {boolean} supComponent
 */
async function lineTemplate(slot, supComponent) {
  const retArray = await Promise.all(
    slot.map(async (sl) => {
      const bindings = await Promise.all(
        sl.bindings.map(async function (bind) {
          return {
            name: bind.title,
            type: await renderType(bind.type),
          }
        }),
      )
      const name = sl.name
      let t = sl.description ?? ''
      return `
${supComponent ? '#' : ''}### ${mdclean(name)}

${mdclean(t)}

${
  bindings.length
    ? `
#### Bindings

${bindings
  .map(
    (p) => `
##### ${p.name}

<div>${p.type}</div>
`,
  )
  .join('\n')}
`
    : ''
}`
    }),
  )

  return retArray.join('')
}
