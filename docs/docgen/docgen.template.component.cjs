// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')
const path = require('path')

const root = path.resolve(__dirname, '../../components')

/** @type typeof import('vue-docgen-cli').defaultTemplates.component */
module.exports = function (...args) {
  const [, doc, , fileName] = args
  const tempName = `__${doc.displayName}__`

  return `
<script lang="ts" setup>
import { ${
    doc.exportName
  } as ${tempName} } from '../../../components/${fileName}'
const components$ = { ${doc.displayName}: ${tempName} }
</script>
${defaultTemplates
  .component(...args)
  .replace(new RegExp(`# ${doc.displayName}`, 'g'), '')}

<a href="vscode://file/${path.resolve(root, fileName)}">Component Source</a>
<a href="vscode://file/${path.resolve(
    root,
    fileName.split('/').slice(0, -1).join('/')
  )}/ReadMe.md">Component Docs</a>`
}
