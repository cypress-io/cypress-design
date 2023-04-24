// @ts-check
const shiki = require('shiki')
const { defaultTemplates } = require('vue-docgen-cli')

const { mdclean } = defaultTemplates

/**
 *
 * @param {{name:string, schema?:any}} type
 * @returns {Promise<string>}
 */
module.exports = async function renderType(type) {
  if (type.schema) {
    return `<code class="bg-gray-50 dark:bg-gray-800 py-[2px] px-[4px]">${await renderComplexTypes(
      type.schema
    )}</code>`
  }
  return (
    `<code class="bg-gray-50 dark:bg-gray-800 py-[2px] px-[4px]">${mdclean(
      type?.name
    ).replace(/\\\|/g, '|')}</code>` ?? ''
  )
}

/**
 * @type {import('shiki').Highlighter | null}
 */
let highlighter = null

/**
 *
 * @param {any} schema
 * @param {boolean} [subType]
 * @returns {Promise<string>}
 */
async function renderComplexTypes(schema, subType) {
  if (!highlighter) {
    highlighter = await shiki.getHighlighter({
      theme: 'github-light',
    })
  }

  if (typeof schema === 'string') {
    if (schema === 'undefined') return undefined
    return schema
  }
  if (schema.kind === 'enum') {
    const values = await Promise.all(
      schema.schema.map((v) => renderComplexTypes(v, true))
    )
    const filteredValues = values.filter((v) => v).join(' | ')
    return subType ? `(${filteredValues})` : filteredValues
  }
  if (schema.kind === 'event') {
    return undefined
  }
  if (schema.kind === 'array') {
    return `${await renderComplexTypes(schema.schema[0], true)}[]`
  }
  if (schema.kind === 'object') {
    const obj = Object.values(schema.schema).map((value) =>
      renderObjectType(value)
    )
    const code = `interface ${schema.type} {
  ${obj.join('\n')}
}`
    return `<Tooltip class="inline-block align-middle" interactive>${
      schema.type
    }<template #popper><div class="text-left max-w-[50vw] max-h-[50vh] overflow-auto">${highlighter.codeToHtml(
      code,
      {
        lang: 'ts',
      }
    )}</div></template></Tooltip>`
  }
  return `
  \`\`\`
  ${JSON.stringify(schema, null, 2)}
  \`\`\`
  `
}

function renderObjectType(value) {
  const type = value.type.replace(' | undefined', '')
  const description = value.description?.length
    ? /\n/.test(value.description)
      ? `\t/**\n\t * ${value.description.replace(
          /(\n\r?)/g,
          '$1\t * '
        )}\n\t */\n`
      : `\t/** ${value.description} */\n`
    : ''

  return `${description}\t${value.name}${value.required ? '' : '?'}: ${type},`
}
