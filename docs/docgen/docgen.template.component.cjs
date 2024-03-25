// @ts-check

/** @type import('vue-docgen-cli').Templates['component'] */
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
