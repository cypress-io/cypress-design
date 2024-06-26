// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')
const renderType = require('./renderType.cjs')

const { renderTags, mdclean } = defaultTemplates

/**
 * Display one line per prop
 * @param {Array<import('vue-docgen-api').PropDescriptor>} props
 * @param {boolean | undefined} supComponent
 */
async function lineTemplate(props, supComponent) {
  const retArray = await Promise.all(
    props.map(async (pr) => {
      if (pr.tags?.deprecated) return ''
      const p = pr.name
      let t = pr.description ?? ''
      t += renderTags(pr.tags)
      const n = pr.type ? await renderType(pr.type) : 'any'
      const d = pr.defaultValue?.value ?? ''

      return `
${supComponent ? '#' : ''}### ${mdclean(p)}

<p><b>type</b> ${n}${pr.required ? ` *required` : ''}${
        d.length ? ` - <b>default</b>: <code>${mdclean(d)}</code>` : ''
      }</p>

${mdclean(t)}

`
    }),
  )

  return retArray.join('')
}

/** @type import('vue-docgen-cli').Templates['props'] */
module.exports = async function renderProp(props, opt) {
  if (!props.length) return ''
  const supComponent = opt?.isSubComponent || opt?.hasSubComponents
  return `
${supComponent ? '#' : ''}## Props

${await lineTemplate(props, supComponent)}
---
`
}
