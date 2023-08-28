// @ts-check

/** @type typeof import('vue-docgen-cli').defaultTemplates.component */
module.exports = function (...args) {
  const [usage, doc, , fileName] = args
  const tempName = `__${doc.displayName}__`

  return `
---
title: ${doc.displayName}
${
  doc.description?.length
    ? `
description: ${doc.description}`
    : ''
}---
<script lang="ts" setup>
import { ${
    doc.exportName
  } as ${tempName} } from '../../../../../components/${fileName}'
const components$ = { ${doc.displayName}: ${tempName} }
</script>
${doc.docsBlocks
  ?.map((d) => d.replace(new RegExp(`# ${doc.displayName}`, 'g'), ''))
  .join('\n\n')}
${usage.props}
${usage.events}
${usage.slots}
${usage.expose}
`
}
