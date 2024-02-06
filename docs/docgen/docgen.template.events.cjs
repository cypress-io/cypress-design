// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')
const renderType = require('./renderType.cjs')

const { mdclean } = defaultTemplates

/**
 * @param {Array<import('vue-docgen-api').EventDescriptor>} events
 * @param {{isSubComponent:boolean, hasSubComponents:boolean}} [opt]
 * @returns {Promise<string>}
 */
module.exports = async function renderProp(events, opt) {
  if (!events.length) return ''
  const supComponent = opt?.isSubComponent || opt?.hasSubComponents
  return `
${supComponent ? '#' : ''}## Events

${await lineTemplate(events, supComponent)}
`
}

/**
 *
 * @param {Array<import('vue-docgen-api').EventDescriptor>} event
 * @param {boolean} supComponent
 */
async function lineTemplate(event, supComponent) {
  const retArray = await Promise.all(
    event.map(async (ev) => {
      const properties = await Promise.all(
        ev.properties.map(
          /**
           * @param {any} prop
           */
          async function (prop) {
            return {
              name: prop.name,
              description: prop.description,
              type: await renderType(prop.type),
            }
          },
        ),
      )
      const name = ev.name
      let t = ev.description ?? ''
      return `
${supComponent ? '#' : ''}### ${mdclean(name)}

${mdclean(t)}

${
  properties.length
    ? `
${supComponent ? '#' : ''}#### Properties

${properties
  .map(
    (p) => `
${supComponent ? '#' : ''}##### ${mdclean(p.name)}

${p.description ? mdclean(p.description) : ''}
<div><b>type</b>: ${p.type ? p.type : ''}</div>

`,
  )
  .join('')}
  `
    : ''
}

`
    }),
  )

  return retArray.join('')
}
