// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')

const { renderTags, mdclean } = defaultTemplates

/**
 *
 * @param {Array<import('vue-docgen-api').PropDescriptor>} props
 * @param {boolean} supComponent
 */
function lineTemplate(props, supComponent) {
  let ret = ''

  props.forEach((pr) => {
    const p = pr.name
    let t = pr.description ?? ''
    t += renderTags(pr.tags)
    const n = pr.type?.name ?? ''
    const d = pr.defaultValue?.value ?? ''

    ret += `
${supComponent ? '#' : ''}### ${mdclean(p)}

**type** ${mdclean(n)}${d.length ? ` - **default**: ${mdclean(d)}` : ''}

${mdclean(t)}

`
  })

  return ret
}

/** @type typeof import('vue-docgen-cli').defaultTemplates.props */
module.exports = function (props, opt) {
  if (!props.length) return ''
  const supComponent = opt?.isSubComponent || opt?.hasSubComponents
  return `
${supComponent ? '#' : ''}## Props

${lineTemplate(props, supComponent)}
`
}
