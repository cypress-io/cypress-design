// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')

const { mdclean } = defaultTemplates

/**
 * remove `<` and `>` from code
 * @param {string} code
 * @returns string
 */
function deTag(code) {
  return code.replace(/<|>/g, (m) => (m === '<' ? '&lt;' : '&gt;'))
}

/**
 *
 * @param {{name:string, schema?:any}} type
 * @returns {Promise<string>}
 */
module.exports = async function renderType(type) {
  if (type.schema) {
    return `<code class="bg-gray-50 py-[2px] px-[4px] inline-block rounded">${await renderComplexTypes(
      type.schema,
    )}</code>`
  }

  return (
    `<code class="bg-gray-50 py-[2px] px-[4px] rounded">${mdclean(
      deTag(type?.name),
    ).replace(/\\\|/g, '|')}</code>` ?? ''
  )
}

/**
 *
 * @param {any} schema
 * @param {boolean} [subType]
 * @returns {Promise<string | undefined>}
 */
async function renderComplexTypes(schema, subType) {
  if (typeof schema === 'string') {
    if (schema === 'undefined') return undefined
    return deTag(schema)
  }

  if (schema.kind === 'enum') {
    const values = await Promise.all(
      schema.schema.map((v) => renderComplexTypes(v, true)),
    )
    const filteredValues = values.filter((v) => v)
    const overflow = filteredValues.length > 12
    const inlineValues = overflow
      ? [...filteredValues.slice(0, 11), '...']
      : filteredValues
    const serializedInlineValues = inlineValues.join(' | ')
    const serializedInlineValuesWrapped = subType
      ? `(${serializedInlineValues})`
      : serializedInlineValues

    return overflow && !subType
      ? await makeTooltip(
          serializedInlineValuesWrapped,
          `type ${schema.type.replace(
            ' | undefined',
            '',
          )} = ${filteredValues.join(' | ')}`,
        )
      : serializedInlineValuesWrapped
  }
  if (schema.kind === 'event') {
    return undefined
  }
  if (schema.kind === 'array') {
    return `${await renderComplexTypes(schema.schema[0], true)}[]`
  }
  if (schema.kind === 'object') {
    const obj = Object.values(schema.schema).map((value) =>
      renderObjectType(value),
    )
    if (obj.includes(undefined)) return schema.type
    const code = `interface ${schema.type} {
  ${obj.join('\n')}
}`
    return subType ? schema.type : await makeTooltip(schema.type, code)
  }
  return `
  \`\`\`
  ${JSON.stringify(schema, null, 2)}
  \`\`\`
  `
}

function renderObjectType(value) {
  const type = value.type?.replace(' | undefined', '')
  if (!type) return undefined
  const description = value.description?.length
    ? /\n/.test(value.description)
      ? `\t/**\n\t * ${value.description.replace(
          /(\n\r?)/g,
          '$1\t * ',
        )}\n\t */\n`
      : `\t/** ${value.description} */\n`
    : ''

  return `${description}\t${value.name}${value.required ? '' : '?'}: ${type},`
}

async function makeTooltip(content, popperCode) {
  const { codeToHtml } = await import('shiki')

  return `<Tooltip class="inline-block align-middle" interactive>${deTag(content)}<template v-slot:popper><span class="shiki-tooltip block text-left max-w-[50vw] max-h-[50vh] overflow-auto">${await codeToHtml(
    popperCode,
    {
      lang: 'ts',
      theme: 'github-light',
    },
  )}</span></template></Tooltip>`
}
