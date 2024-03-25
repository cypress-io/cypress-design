// @ts-check\

function getDisplayName(doc) {
  return doc.exportName === 'default' ? doc.displayName : doc.exportName
}

/** @type import('vue-docgen-cli').Templates['header'] */
module.exports = function (...args) {
  const [docs, , , fileName] = args
  const [doc] = docs

  const frontMatter =
    docs.length === 1
      ? `---
title: ${doc.displayName}
${
  doc.description?.length
    ? `
description: ${doc.description}`
    : ''
}---`
      : ''

  const titleName =
    docs.length > 1
      ? fileName.split('.').shift().split('/').pop()
      : doc.displayName

  return `${frontMatter}
<script lang="ts" setup>
import {${docs.map((d) => ` ${d.exportName} as __${d.exportName}__ `).join(',')} } from '../../../components/${fileName}'
  const components$ = { ${docs.map((d) => `'${getDisplayName(d)}': __${d.exportName}__`).join(',')} }
</script>

${doc.docsBlocks
  ?.map((d) => d.replace(new RegExp(`# ${titleName}`, 'g'), ''))
  .join('\n\n')}
`
}
