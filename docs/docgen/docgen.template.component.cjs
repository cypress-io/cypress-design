// @ts-check

/** @type typeof import('vue-docgen-cli').defaultTemplates.component */
module.exports = function (...args) {
  const [usage, doc, , , requiresMd, subTemplateOptions] = args

  return `${subTemplateOptions.isSubComponent ? `## ${doc.displayName}` : ''}
${usage.props}
${usage.events}
${usage.slots}
${usage.expose}


${requiresMd.length ? requiresMd.join('\n\n') : ''}
`
}
