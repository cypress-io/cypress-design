// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')
const renderType = require('./renderType.cjs')

const { mdclean } = defaultTemplates

/** @type import('vue-docgen-cli').Templates['events'] */
module.exports = async function renderEvents(events, opt, doc) {
  if (!events.length) return ''
  const supComponent = opt?.isSubComponent || opt?.hasSubComponents
  return `
${supComponent ? '#' : ''}## Events

${await lineTemplate(events, supComponent, doc?.displayName ?? '')}
`
}

/**
 *
 * @param {Array<import('vue-docgen-api').EventDescriptor>} event
 * @param {boolean | undefined} supComponent
 * @param {string} displayName
 */
async function lineTemplate(event, supComponent, displayName) {
  const retArray = await Promise.all(
    event.map(async (ev) => {
      const properties = await Promise.all(
        ev.properties?.map(
          /**
           * @param {any} prop
           */
          async function (prop) {
            return {
              name: prop.name,
              description: prop.description,
              typeName: prop.type?.names[0] ?? 'any',
              type: await renderType(prop),
            }
          },
        ) ?? [],
      )

      const name = ev.name
      let t = ev.description ?? ''
      return `
${supComponent ? '#' : ''}### ${mdclean(name)}

\`\`\`vue
<${displayName} @${name}="(${
        properties.length ? compilePropertyChain(properties) : ''
      }) => { 
        // your code here
      }" />
\`\`\`

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

function compilePropertyChain(properties) {
  return properties.map((p) => `${p.name}: ${p.typeName}`).join(',')
}
