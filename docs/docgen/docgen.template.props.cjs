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
    const n = renderType(pr.type)
    const d = pr.defaultValue?.value ?? ''

    ret += `
${supComponent ? '#' : ''}### ${mdclean(p)}

<p><em>type</em> ${n}${
      d.length ? ` - <em>default</em>: <code>${mdclean(d)}</code>` : ''
    }</p>

${mdclean(t)}

`
  })

  return ret
}

module.exports = function renderProp(props, opt) {
  if (!props.length) return ''
  const supComponent = opt?.isSubComponent || opt?.hasSubComponents
  return `
${supComponent ? '#' : ''}## Props

${lineTemplate(props, supComponent)}
`
}

function renderType(type) {
  if (type.schema) {
    return renderComplexTypes(type.schema)
  }
  return `<code>${mdclean(type?.name)}</code>` ?? ''
}

/**
 *
 * @param {any} schema
 * @returns {string}
 */
function renderComplexTypes(schema) {
  if (typeof schema === 'string') {
    return undefined
  }
  if (schema.kind === 'enum') {
    return `(${schema.schema
      .map((v) => renderComplexTypes(v))
      .filter((v) => v)
      .join(' | ')})`
  }
  if (schema.kind === 'event') {
    return undefined
  }
  if (schema.kind === 'array') {
    return `${renderComplexTypes(schema.schema[0])}[]`
  }
  if (schema.kind === 'object') {
    const obj = Object.values(schema.schema).map((value) =>
      renderObjectType(value)
    )
    const code = `interface ${schema.type} {
  ${obj.join('\n')}
}`
    return `<Tooltip class="inline-block" interactive><code>${schema.type}</code><template #popper><div class="text-left"><pre>${code}</pre></div></template></Tooltip>`
  }
  return `
  \`\`\`
  ${JSON.stringify(schema, null, 2)}
  \`\`\`
  `
}

function renderObjectType(value) {
  const type = value.type.replace(' | undefined', '')
  return `\t${value.name}${value.required ? '' : '?'}: ${type},`
}
